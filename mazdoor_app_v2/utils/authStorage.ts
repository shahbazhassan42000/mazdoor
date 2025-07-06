// 3rd Party Imports
import AsyncStorage from "@react-native-async-storage/async-storage";
// Alias Imports
import { TOKEN_KEY, USER_KEY } from "@/constants/constants";

/**
 * Store authentication token
 * @param token - JWT token to store
 */
export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

/**
 * Get stored authentication token
 * @returns Promise resolving to token or null
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

/**
 * Remove stored authentication token
 */
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

/**
 * Store user data
 * @param userData - User data to store
 */
export const storeUserData = async (userData: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error("Error storing user data:", error);
  }
};

/**
 * Get stored user data
 * @returns Promise resolving to user data or null
 */
export const getUserData = async (): Promise<any | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

/**
 * Remove stored user data
 */
export const removeUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error removing user data:", error);
  }
};

/**
 * Clear all stored auth data
 */
export const clearAuthData = async (): Promise<void> => {
  try {
    await Promise.all([removeToken(), removeUserData()]);
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};

/**
 * Check if user is authenticated
 * @returns Promise resolving to boolean
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await getToken();
    return !!token;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};
