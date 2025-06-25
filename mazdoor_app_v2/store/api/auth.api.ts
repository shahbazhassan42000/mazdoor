// Alias Imports
import { URLS } from "@/constants/urls";
import { BASE_URL } from "@/constants/constants";

export const checkEmailAvailability = async (email: string) => {
  const url = `${BASE_URL}/${URLS.users}/${URLS.checkEmail}`;
  console.log(`Checking email availability: ${url}`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email } }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
};

export const registerUser = async (userData: {
  email: string;
  username: string;
  password: string;
  userType: string;
}) => {
  const url = `${BASE_URL}/${URLS.users}/signup`;
  console.log(`Registering user: ${url}`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: userData.email,
          username: userData.username,
          password: userData.password,
          role: userData.userType.toUpperCase(),
        },
      }),
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
