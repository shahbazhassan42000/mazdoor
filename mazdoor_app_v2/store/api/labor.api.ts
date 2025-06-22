// Alias Imports
import { URLS } from "@/constants/urls";
import { BASE_URL } from "@/constants/constants";

export const fetchUsersByRole = async (role: string) => {
  const url = `${BASE_URL}/${URLS.users}/${URLS.getUserByRole}/?role=${role}`;
  console.log(`Fetching labors:${role} from URL: ${url}`);

  try {
    const data = await fetch(url, {
      method: "GET",
    });
    return data;
  } catch (error) {
    return error;
  }
};
