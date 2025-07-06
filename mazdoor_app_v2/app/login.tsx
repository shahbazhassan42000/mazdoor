// Native Imports
import React, { FC, useState } from "react";
import {
  View,
  Platform,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import {
  Card,
  Text,
  Appbar,
  Button,
  Surface,
  TextInput,
} from "react-native-paper";
// Alias Imports
import Colors from "@/constants/Colors";
import { AuthAPI } from "@/store/api";

interface LoginFormData {
  username: string;
  password: string;
}

const Login: FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  /**
   * Handle input changes and clear errors
   * @param field - The form field to update
   * @param value - The new value for the field
   */
  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (loginError) {
      setLoginError("");
    }
  };

  /**
   * Handle login form submission
   * @returns Promise<void>
   */
  const handleLogin = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setLoginError(""); // Clear any previous errors

      const result = await AuthAPI.loginUser({
        username: formData.username.trim(),
        password: formData.password,
      });
      if (result.success) {
        // Handle successful login
        console.log("Login successful:", result.data);

        // Get current user data with the stored token
        try {
          const userResult = await AuthAPI.getCurrentUser();
          if (userResult.success) {
            console.log("User data retrieved:", userResult.data);
          }
        } catch (userError) {
          console.error("Error getting user data:", userError);
        }

        // Navigate to main app or dashboard
        router.replace("/dashboard"); // Navigate to dashboard page
      } else {
        // Handle server validation errors
        if (result.data && typeof result.data === "object") {
          if (result.data.type && result.data.msg) {
            // Server validation error
            setLoginError(result.data.msg);
          } else if (result.data.error) {
            // General error
            setLoginError(result.data.error);
          } else if (result.data.message) {
            // Alternative error format
            setLoginError(result.data.message);
          } else {
            setLoginError(t("login_failed"));
          }
        } else if (typeof result.data === "string") {
          setLoginError(result.data);
        } else {
          // Handle common HTTP status codes
          if (result.data?.status === 401) {
            setLoginError(t("invalid_credentials"));
          } else if (result.data?.status === 403) {
            setLoginError(t("account_not_verified"));
          } else if (result.data?.status === 423) {
            setLoginError(t("account_disabled"));
          } else {
            setLoginError(t("login_failed"));
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(t("network_error"));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle back button press
   */
  const handleBackPress = (): void => {
    router.back();
  };

  /**
   * Navigate to signup screen
   */
  const handleSignupNavigation = (): void => {
    router.push("/signup");
  };

  /**
   * Check if the form is valid for submission
   * @returns boolean indicating if form can be submitted
   */
  const isFormValid = (): boolean => {
    return formData.username.trim() !== "" && formData.password !== "";
  };

  /**
   * Render the login form
   * @returns JSX element containing the login form
   */
  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        {t("login_to_account")}
      </Text>

      <Text variant="bodyMedium" style={styles.subtitle}>
        {t("welcome_back")}
      </Text>

      <TextInput
        label={t("username")}
        placeholder={t("enter_username")}
        value={formData.username}
        onChangeText={(value) => handleInputChange("username", value)}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        theme={{ colors: { primary: Colors.primary } }}
        error={!!loginError}
      />

      <TextInput
        label={t("password")}
        placeholder={t("enter_password")}
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
        mode="outlined"
        style={styles.input}
        secureTextEntry
        theme={{ colors: { primary: Colors.primary } }}
        error={!!loginError}
      />

      {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.loginButton}
        buttonColor={Colors.primary}
        textColor={Colors.white}
        disabled={!isFormValid() || isLoading}
        loading={isLoading}
        contentStyle={styles.buttonContent}
      >
        {t("login")}
      </Button>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{t("dont_have_account")} </Text>

        <TouchableOpacity onPress={handleSignupNavigation}>
          <Text style={styles.signupLink}>{t("sign_up_here")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBackPress} />
        <Appbar.Content title={t("login")} />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card style={styles.card}>
            <Card.Content>{renderLoginForm()}</Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </Surface>
  );
};

export default Login;

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
    justifyContent: "center",
  },
  card: {
    margin: 0,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  formContainer: {
    gap: 16,
    paddingVertical: 20,
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
  input: {
    backgroundColor: Colors.white,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    textAlign: "center",
  },
  loginButton: {
    marginTop: 16,
    paddingVertical: 8,
    minHeight: 48,
  },
  buttonContent: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signupText: {
    fontSize: 14,
    color: Colors.textGray,
  },
  signupLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600",
  },
});
