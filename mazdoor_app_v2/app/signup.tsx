// Native Imports
import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  PanResponder,
  Dimensions,
} from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import {
  TextInput,
  Button,
  Card,
  Text,
  Appbar,
  Surface,
  ActivityIndicator,
  RadioButton,
} from "react-native-paper";
// Alias Imports
import Colors from "@/constants/Colors";
import { AuthAPI } from "@/store/api";

type UserType = "Customer" | "Labor";

interface FormData {
  userType: UserType | null;
  email: string;
  username: string;
  password: string;
}

const Signup: FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [formData, setFormData] = useState<FormData>({
    userType: null,
    email: "",
    username: "",
    password: "",
  });

  // Helper function to determine if a step is accessible
  const isStepAccessible = (stepNumber: number): boolean => {
    if (stepNumber === 1) return true;
    if (stepNumber === 2) return formData.userType !== null;
    if (stepNumber === 3)
      return formData.userType !== null && formData.email !== "" && !emailError;
    if (stepNumber === 4) return completedSteps.includes(3);
    return false;
  };

  // Helper function to check if step is completed
  const isStepCompleted = (stepNumber: number): boolean => {
    if (stepNumber === 1) return formData.userType !== null;
    if (stepNumber === 2) return formData.email !== "" && !emailError;
    if (stepNumber === 3)
      return formData.username !== "" && formData.password !== "";
    if (stepNumber === 4) return completedSteps.includes(4);
    return false;
  };

  // Navigation function for stepper clicks and gestures
  const navigateToStep = async (targetStep: number) => {
    if (!isStepAccessible(targetStep) || targetStep === currentStep) return;

    // If going to step 3 and email hasn't been validated, validate it first
    if (
      targetStep === 3 &&
      currentStep === 2 &&
      formData.email &&
      !completedSteps.includes(2)
    ) {
      setIsLoading(true);
      const isEmailAvailable = await checkEmailAvailability(formData.email);
      setIsLoading(false);

      if (isEmailAvailable) {
        setCompletedSteps((prev) => [...prev, 2]);
        setCurrentStep(targetStep);
      } else {
        setEmailError("This email is already taken");
        return;
      }
    } else {
      setCurrentStep(targetStep);
    }
  };

  // Gesture handler for swipe navigation
  const screenWidth = Dimensions.get("window").width;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 80;
    },
    onPanResponderMove: (evt, gestureState) => {},
    onPanResponderRelease: (evt, gestureState) => {
      const { dx } = gestureState;
      const threshold = screenWidth * 0.25; // 25% of screen width

      if (dx > threshold && currentStep > 1) {
        // Swipe right - go back
        navigateToStep(currentStep - 1);
      } else if (dx < -threshold && currentStep < 4) {
        // Swipe left - go forward
        if (currentStep === 1 && formData.userType) {
          navigateToStep(2);
        } else if (currentStep === 2 && formData.email) {
          navigateToStep(3);
        } else if (
          currentStep === 3 &&
          formData.username &&
          formData.password
        ) {
          handleSignup();
        }
      }
    },
  });

  const handleInputChange = (
    field: keyof FormData,
    value: string | UserType
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === "email") {
      setEmailError("");
    }
    if (field === "username" || field === "password") {
      setSignupError("");
    }
  };

  const checkEmailAvailability = async (email: string): Promise<boolean> => {
    try {
      const data = await AuthAPI.checkEmailAvailability(email);
      return data.status === "success"; // Return true if email is available
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      setSignupError(""); // Clear any previous errors
      const result = await AuthAPI.registerUser({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        userType: formData.userType as string,
      });

      if (result.success) {
        setCompletedSteps((prev) => [...prev, 3, 4]);
        setCurrentStep(4); // Move to confirmation step
      } else {
        // Handle server validation errors
        if (result.data && typeof result.data === "object") {
          if (result.data.type && result.data.msg) {
            // Server validation error (like password requirements)
            setSignupError(result.data.msg);
          } else if (result.data.error) {
            // General error
            setSignupError(result.data.error);
          } else {
            setSignupError("Registration failed. Please try again.");
          }
        } else if (typeof result.data === "string") {
          setSignupError(result.data);
        } else {
          setSignupError("Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    if (currentStep === 1 && formData.userType) {
      setCompletedSteps((prev) => [...prev, 1]);
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.email) {
      setIsLoading(true);
      const isEmailAvailable = await checkEmailAvailability(formData.email);
      setIsLoading(false);

      if (isEmailAvailable) {
        setCompletedSteps((prev) => [...prev, 2]);
        setCurrentStep(3);
      } else {
        setEmailError("This email is already taken");
      }
    } else if (currentStep === 3 && formData.username && formData.password) {
      await handleSignup();
    }
  };

  const handleBackPress = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const renderStepper = () => {
    const steps = [
      { number: 1, title: t("step_type") ?? "Type" },
      { number: 2, title: t("step_email") ?? "Email" },
      { number: 3, title: t("step_details") ?? "Details" },
      { number: 4, title: t("step_confirm") ?? "Confirm" },
    ];

    return (
      <View style={styles.stepperContainer}>
        {steps.map((step, index) => {
          const isAccessible = isStepAccessible(step.number);
          const isCompleted = isStepCompleted(step.number);
          const isCurrent = currentStep === step.number;

          return (
            <View key={step.number} style={styles.stepContainer}>
              <TouchableOpacity
                style={[
                  styles.stepCircle,
                  isCurrent
                    ? styles.stepCircleActive
                    : isCompleted
                    ? styles.stepCircleCompleted
                    : isAccessible
                    ? styles.stepCircleAccessible
                    : styles.stepCircleInactive,
                ]}
                onPress={() => navigateToStep(step.number)}
                disabled={!isAccessible}
              >
                <Text
                  style={[
                    styles.stepNumber,
                    isCurrent || isCompleted
                      ? styles.stepNumberActive
                      : isAccessible
                      ? styles.stepNumberAccessible
                      : styles.stepNumberInactive,
                  ]}
                >
                  {isCompleted ? "✓" : step.number}
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.stepTitle,
                  isCurrent ? styles.stepTitleActive : styles.stepTitleDefault,
                ]}
              >
                {step.title}
              </Text>
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    isCompleted || currentStep > step.number
                      ? styles.stepLineActive
                      : styles.stepLineInactive,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderUserTypeSelection = () => (
    <View style={styles.formContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        {t("choose_account_type") ?? "Choose Account Type"}
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {t("select_how_to_use") ?? "Select how you want to use Mazdoor"}
      </Text>

      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioOption,
            formData.userType === "Customer" && styles.radioOptionSelected,
          ]}
          onPress={() => handleInputChange("userType", "Customer")}
        >
          <RadioButton
            value="Customer"
            status={formData.userType === "Customer" ? "checked" : "unchecked"}
            onPress={() => handleInputChange("userType", "Customer")}
            color={Colors.primary}
          />
          <View style={styles.radioContent}>
            <Text variant="titleMedium" style={styles.radioTitle}>
              {t("customer") ?? "Customer"}
            </Text>
            <Text variant="bodySmall" style={styles.radioDescription}>
              {t("hire_workers") ?? "I want to hire workers for projects"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.radioOption,
            formData.userType === "Labor" && styles.radioOptionSelected,
          ]}
          onPress={() => handleInputChange("userType", "Labor")}
        >
          <RadioButton
            value="Labor"
            status={formData.userType === "Labor" ? "checked" : "unchecked"}
            onPress={() => handleInputChange("userType", "Labor")}
            color={Colors.primary}
          />
          <View style={styles.radioContent}>
            <Text variant="titleMedium" style={styles.radioTitle}>
              {t("labor") ?? "Labor"}
            </Text>
            <Text variant="bodySmall" style={styles.radioDescription}>
              {t("find_work") ?? "I want to find work opportunities"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.navigationButtons}>
        <Button
          mode="outlined"
          onPress={handleBackPress}
          style={[styles.navigationButton, styles.backButton]}
          buttonColor={Colors.white}
          textColor={Colors.primary}
          contentStyle={styles.buttonContent}
        >
          {t("back") ?? "Back"}
        </Button>
        <Button
          mode="contained"
          onPress={handleNextStep}
          style={[styles.navigationButton]}
          buttonColor={Colors.primary}
          textColor={Colors.white}
          disabled={!formData.userType}
          contentStyle={styles.buttonContent}
        >
          {t("next") ?? "Next"}
        </Button>
      </View>
    </View>
  );

  const renderEmailStep = () => (
    <View style={styles.formContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        {t("enter_your_email") ?? "Enter Your Email"}
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {t("check_email_available") ?? "We'll check if this email is available"}
      </Text>

      <TextInput
        label={t("email_address") ?? "Email Address"}
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{ colors: { primary: Colors.primary } }}
        error={!!emailError}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.navigationButtons}>
        <Button
          mode="outlined"
          onPress={() => navigateToStep(1)}
          style={[styles.navigationButton, styles.backButton]}
          buttonColor={Colors.white}
          textColor={Colors.primary}
          contentStyle={styles.buttonContent}
        >
          {t("back") ?? "Back"}
        </Button>
        <Button
          mode="contained"
          onPress={handleNextStep}
          style={[styles.navigationButton]}
          buttonColor={Colors.primary}
          textColor={Colors.white}
          disabled={!formData.email || isLoading}
          loading={isLoading}
          contentStyle={styles.buttonContent}
        >
          {t("check_email") ?? "Check Email"}
        </Button>
      </View>
    </View>
  );

  const renderDetailsStep = () => (
    <View style={styles.formContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        {t("account_details") ?? "Account Details"}
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {t("create_username_password") ?? "Create your username and password"}
      </Text>

      <TextInput
        label={t("username") ?? "Username"}
        value={formData.username}
        onChangeText={(value) => handleInputChange("username", value)}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        theme={{ colors: { primary: Colors.primary } }}
      />

      <TextInput
        label={t("password") ?? "Password"}
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        mode="outlined"
        style={styles.input}
        secureTextEntry
        theme={{ colors: { primary: Colors.primary } }}
        error={!!signupError}
      />
      {signupError ? <Text style={styles.errorText}>{signupError}</Text> : null}

      <View style={styles.navigationButtons}>
        <Button
          mode="outlined"
          onPress={() => navigateToStep(2)}
          style={[styles.navigationButton, styles.backButton]}
          buttonColor={Colors.white}
          textColor={Colors.primary}
          contentStyle={styles.buttonContent}
        >
          {t("back") ?? "Back"}
        </Button>
        <Button
          mode="contained"
          onPress={handleNextStep}
          style={[styles.navigationButton]}
          buttonColor={Colors.primary}
          textColor={Colors.white}
          disabled={!formData.username || !formData.password || isLoading}
          loading={isLoading}
          contentStyle={styles.buttonContent}
        >
          {t("create_account") ?? "Create Account"}
        </Button>
      </View>
    </View>
  );

  const renderConfirmationStep = () => (
    <View style={styles.formContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        {t("check_your_email") ?? "Check Your Email"}
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        {t("confirmation_email_sent") ??
          "A confirmation email has been sent to:"}
      </Text>
      <Text variant="bodyLarge" style={styles.emailConfirmation}>
        {formData.email}
      </Text>
      <Text variant="bodyMedium" style={styles.confirmationText}>
        {t("check_email_confirm") ??
          "Please check your email and click the confirmation link to activate your account."}
      </Text>

      <Button
        mode="contained"
        onPress={() => router.back()}
        style={styles.nextButton}
        buttonColor={Colors.primary}
        textColor={Colors.white}
        contentStyle={styles.buttonContent}
      >
        {t("go_back_to_login") ?? "Go Back to Login"}
      </Button>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderUserTypeSelection();
      case 2:
        return renderEmailStep();
      case 3:
        return renderDetailsStep();
      case 4:
        return renderConfirmationStep();
      default:
        return renderUserTypeSelection();
    }
  };

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title={t("signup") ?? "Sign Up"} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        {...panResponder.panHandlers}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Card.Content>
              {renderStepper()}
              <View style={styles.gestureHint}>
                <Text variant="bodySmall" style={styles.gestureHintText}>
                  {t("swipe_navigate_hint") ??
                    "Swipe left/right or tap steps to navigate"}
                </Text>
              </View>
              {renderCurrentStep()}
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Surface>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.white,
    elevation: 0,
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    margin: 0,
    backgroundColor: Colors.white,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  stepContainer: {
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepCircleCompleted: {
    backgroundColor: Colors.yellow,
  },
  stepCircleAccessible: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  stepCircleInactive: {
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.tabIconDefault,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "600",
  },
  stepNumberActive: {
    color: Colors.white,
  },
  stepNumberAccessible: {
    color: Colors.primary,
  },
  stepNumberInactive: {
    color: Colors.tabIconDefault,
  },
  stepTitle: {
    fontSize: 12,
    color: Colors.textGray,
    textAlign: "center",
  },
  stepTitleActive: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: "center",
    fontWeight: "600",
  },
  stepTitleDefault: {
    fontSize: 12,
    color: Colors.textGray,
    textAlign: "center",
  },
  stepLine: {
    position: "absolute",
    top: 20,
    left: "50%",
    right: "-50%",
    height: 2,
    zIndex: -1,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
  stepLineInactive: {
    backgroundColor: Colors.tabIconDefault,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textGray,
    textAlign: "center",
    marginBottom: 24,
  },
  formContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: Colors.white,
  },
  nextButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  radioContainer: {
    gap: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.background,
    backgroundColor: Colors.white,
  },
  radioOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.peachLight,
  },
  radioContent: {
    flex: 1,
    marginLeft: 12,
  },
  radioTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  radioDescription: {
    fontSize: 14,
    color: Colors.textGray,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  emailConfirmation: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
    marginVertical: 16,
  },
  confirmationText: {
    fontSize: 14,
    color: Colors.textGray,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  gestureHint: {
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  gestureHintText: {
    fontSize: 12,
    color: Colors.textGray,
    textAlign: "center",
    fontStyle: "italic",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  navigationButton: {
    flex: 1,
    paddingVertical: 8,
    minHeight: 48,
  },
  buttonContent: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
});
