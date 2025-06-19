// Alias Imports
import { URLS } from "@/constants/urls";
import { BASE_URL } from "@/constants/constants";

export const fetchLabors = async () => {
  const url = `${BASE_URL}/${URLS.users}/${URLS.getUserByRole}/?role=LABOR`;
  console.log("Fetching labors from URL:", url);

  try {
    const data = await fetch(url, {
      method: "GET",
    });
    return data;
  } catch (error) {
    return error;
  }
};
