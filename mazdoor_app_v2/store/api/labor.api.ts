// Alias Imports
import { URLS } from "@/constants/urls";
import { BASE_URL } from "@/constants/constants";
import { getAuthHeaders } from "./auth.api";

export const fetchUsersByRole = async (role: string) => {
  const url = `${BASE_URL}/${URLS.users}/${URLS.getUserByRole}/?role=${role}`;
  console.log(`Fetching labors:${role} from URL: ${url}`);

  try {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getLaborTypes = async () => {
  const url = `${BASE_URL}/${URLS.laborTypes}`;
  console.log(`Getting labor types: ${url}`);

  try {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error("Error getting labor types:", error);
    throw error;
  }
};

export const getLaborers = async (params?: {
  role?: string;
  type?: string;
  area?: string;
}) => {
  let url = `${BASE_URL}/${URLS.users}/${URLS.getUserByRole}`;

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (params?.role) {
    queryParams.append("role", params.role);
  } else {
    queryParams.append("role", "LABOR"); // Default to labor role
  }

  if (params?.type) {
    queryParams.append("type", params.type);
  }

  if (params?.area) {
    queryParams.append("area", params.area);
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  console.log(`Getting laborers: ${url}`);

  try {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error("Error getting laborers:", error);
    throw error;
  }
};

export const getLaborerById = async (id: string) => {
  const url = `${BASE_URL}/${URLS.users}/${id}`;
  console.log(`Getting laborer by ID: ${url}`);

  try {
    const headers = await getAuthHeaders();
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error("Error getting laborer by ID:", error);
    throw error;
  }
};
