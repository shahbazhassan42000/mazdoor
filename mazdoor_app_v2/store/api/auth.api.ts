// Alias Imports
import { URLS } from "@/constants/urls";
import { BASE_URL } from "@/constants/constants";
import {
  getToken,
  storeToken,
  storeUserData,
  clearAuthData,
} from "@/utils/authStorage";

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

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const url = `${BASE_URL}/${URLS.users}/${URLS.login}`;
  console.log(`Logging in user: ${url}`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: credentials.username,
          password: credentials.password,
        },
      }),
    });
    const data = await response.json();

    // If login is successful, store the token
    if (response.ok && data) {
      const token = typeof data === "string" ? data : data.token;
      if (token) {
        await storeToken(token);
        console.log("Token stored successfully");
      }
    }

    return { success: response.ok, data };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

/**
 * Get authenticated headers with token
 * @returns Promise resolving to headers object
 */
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const token = await getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Get current user data from backend using stored token
 */
export const getCurrentUser = async () => {
  const url = `${BASE_URL}/${URLS.users}/getByToken`;
  console.log(`Getting current user: ${url}`);

  try {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json();

    // Store user data if successful
    if (response.ok && data.user) {
      await storeUserData(data.user);
    }

    return { success: response.ok, data };
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
};

/**
 * Logout user by clearing stored data
 */
export const logoutUser = async () => {
  try {
    await clearAuthData();
    console.log("User logged out successfully");
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error };
  }
};
