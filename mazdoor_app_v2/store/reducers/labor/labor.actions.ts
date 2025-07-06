// 3rd Party Imports
import { AppDispatch } from "@/store";
import { LaborAPI } from "@/store/api";
// Alias Imports
import { Role } from "@/models/enums";
import { Admin, Labor } from "@/models/interfaces";
import { laborActions } from "./laborSlice";

// Backend data interfaces

interface BackendLaborer {
  _id: string;
  username: string;
  email: string;
  role: string;
  type?: string;
  CNIC?: string;
  phone?: string;
  area?: string;
  state?: string;
  city?: string;
  startingWage?: number;
  profileCompleted?: boolean;
  image?: string;
  rating?: number;
  skills?: string[];
  age?: number;
  experience?: string;
}

// UI interfaces for display
interface LaborCategory {
  name: string;
  nameKey: string;
  description: string;
  descriptionKey: string;
  icon: string;
  color: string;
  laborCount: number;
}

interface Laborer {
  id: string;
  name: string;
  category: string;
  image: string;
  age: number;
  cnic: string;
  area: string;
  phone: string;
  rating: number;
  experience: string;
  hourlyRate: number;
  isAvailable: boolean;
  skills: string[];
}

/**
 * Create category mapping with icons and colors
 */
const getCategoryMapping = (laborTypes: string[]): LaborCategory[] => {
  const categoryMappings: Record<
    string,
    { icon: string; color: string; nameKey: string; descriptionKey: string }
  > = {
    Mistri: {
      icon: "hammer",
      color: "#FF6B6B",
      nameKey: "category_mistri",
      descriptionKey: "category_mistri_desc",
    },
    Carpenter: {
      icon: "tools",
      color: "#4ECDC4",
      nameKey: "category_carpenter",
      descriptionKey: "category_carpenter_desc",
    },
    Plumber: {
      icon: "water",
      color: "#45B7D1",
      nameKey: "category_plumber",
      descriptionKey: "category_plumber_desc",
    },
    Electrician: {
      icon: "flash",
      color: "#F7DC6F",
      nameKey: "category_electrician",
      descriptionKey: "category_electrician_desc",
    },
    Painter: {
      icon: "brush",
      color: "#BB8FCE",
      nameKey: "category_painter",
      descriptionKey: "category_painter_desc",
    },
    Cleaner: {
      icon: "broom",
      color: "#85C1E9",
      nameKey: "category_cleaner",
      descriptionKey: "category_cleaner_desc",
    },
    "Rang Saaz": {
      icon: "brush",
      color: "#F1948A",
      nameKey: "category_painter",
      descriptionKey: "category_painter_desc",
    },
    Mazdoor: {
      icon: "hammer",
      color: "#82E0AA",
      nameKey: "category_mistri",
      descriptionKey: "category_mistri_desc",
    },
  };

  return laborTypes.map((type, _index) => {
    const mapping = categoryMappings[type] || {
      icon: "person",
      color: "#95A5A6",
      nameKey: "category_other",
      descriptionKey: "category_other_desc",
    };

    return {
      name: type,
      nameKey: mapping.nameKey,
      description: mapping.descriptionKey,
      descriptionKey: mapping.descriptionKey,
      icon: mapping.icon,
      color: mapping.color,
      laborCount: 0, // Will be updated after laborers are loaded
    };
  });
};

/**
 * Transform backend laborer data to UI format
 */
const transformLaborerData = (
  backendLaborers: BackendLaborer[],
  categories: LaborCategory[]
): Laborer[] => {
  return backendLaborers
    .filter((laborer) => laborer.role === "LABOR")
    .map((laborer) => {
      const category = categories.find((cat) => cat.name === laborer.type);

      return {
        id: laborer._id,
        name: laborer.username || "Unknown",
        category: laborer.type || "General",
        image: laborer.image || "",
        age: laborer.age || 25,
        cnic: laborer.CNIC || "",
        area: laborer.area || laborer.city || "Unknown",
        phone: laborer.phone || "",
        rating: laborer.rating || 4.0,
        experience: laborer.experience || "2 years",
        hourlyRate: laborer.startingWage || 500,
        isAvailable: laborer.profileCompleted || false,
        skills: laborer.skills || [],
      };
    });
};

export const fetchLabors = () => {
  return async (dispatch: AppDispatch) => {
    const response: any = await LaborAPI.fetchUsersByRole(Role.LABOR);

    if (response?.status === 200) {
      const data = await response.json();
      const labors: Labor[] = data;
      dispatch(laborActions.setLabors(labors));
      console.log("Labors fetched successfully:", labors.length);
    } else {
      dispatch(laborActions.setLabors([]));
    }
  };
};

export const fetchTeam = () => {
  return async (dispatch: AppDispatch) => {
    const response: any = await LaborAPI.fetchUsersByRole(Role.ADMIN);

    if (response?.status === 200) {
      const data = await response.json();
      const team: Admin[] = data;
      dispatch(laborActions.setTeam(team));
      console.log("Admins fetched successfully:", team.length);
    } else {
      dispatch(laborActions.setTeam([]));
    }
  };
};

/**
 * Fetch labor types from backend and store in Redux
 */
export const fetchLaborTypes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(laborActions.setLoading(true));
      dispatch(laborActions.setError(null));

      const result = await LaborAPI.getLaborTypes();
      if (result.success && Array.isArray(result.data)) {
        dispatch(laborActions.setLaborTypes(result.data));
        console.log("Labor types fetched successfully:", result.data.length);
      } else {
        console.error("Failed to fetch labor types:", result.data);
        dispatch(laborActions.setError("Failed to fetch labor types"));
        dispatch(laborActions.setLaborTypes([]));
      }
    } catch (error) {
      console.error("Error fetching labor types:", error);
      dispatch(laborActions.setError("Error fetching labor types"));
      dispatch(laborActions.setLaborTypes([]));
    }
  };
};

/**
 * Fetch laborers from backend and store in Redux
 */
export const fetchLaborersWithTypes = () => {
  return async (dispatch: AppDispatch, getState: any) => {
    try {
      dispatch(laborActions.setLoading(true));
      dispatch(laborActions.setError(null));

      // Fetch labor types and laborers in parallel
      const [laborTypesResult, laborersResult] = await Promise.all([
        LaborAPI.getLaborTypes(),
        LaborAPI.getLaborers({ role: "LABOR" }),
      ]);

      if (!laborTypesResult.success || !Array.isArray(laborTypesResult.data)) {
        throw new Error("Failed to fetch labor types");
      }

      if (!laborersResult.success || !Array.isArray(laborersResult.data)) {
        throw new Error("Failed to fetch laborers");
      }

      const laborTypes: string[] = laborTypesResult.data;
      const backendLaborers: BackendLaborer[] = laborersResult.data;

      console.log("Fetched labor types:", laborTypes);

      console.log("----------------------------------------");

      // Store raw labor types
      dispatch(laborActions.setLaborTypes(laborTypes));

      // Create categories with proper mapping
      const categories = getCategoryMapping(laborTypes);

      // Transform laborers
      const transformedLaborers = transformLaborerData(
        backendLaborers,
        categories
      );

      // Update labor count for each category
      const categoriesWithCount = categories.map((category) => ({
        ...category,
        laborCount: transformedLaborers.filter(
          (laborer) => laborer.category === category.name
        ).length,
      }));

      console.log("Transformed laborers:", transformedLaborers);
      console.log("Categories with count:", categoriesWithCount);

      // Store processed data
      dispatch(laborActions.setLaborCategories(categoriesWithCount));
      dispatch(laborActions.setTransformedLaborers(transformedLaborers));

      console.log("Labor data fetched and processed successfully");
      console.log("Labor types:", laborTypes.length);
      console.log("Categories:", categoriesWithCount.length);
      console.log("Transformed laborers:", transformedLaborers.length);
    } catch (error: any) {
      console.error("Error fetching labor data:", error);
      dispatch(
        laborActions.setError(error.message || "Error fetching labor data")
      );
      dispatch(laborActions.setLaborTypes([]));
      dispatch(laborActions.setLaborCategories([]));
      dispatch(laborActions.setTransformedLaborers([]));
    } finally {
      dispatch(laborActions.setLoading(false));
    }
  };
};

/**
 * Clear all labor data from store
 */
export const clearLaborData = () => {
  return (dispatch: AppDispatch) => {
    dispatch(laborActions.resetAll());
  };
};

// Selector functions for easy access to labor data
export const selectLaborTypes = (state: any) => state.laborSlice.laborTypes;
export const selectLaborCategories = (state: any) =>
  state.laborSlice.laborCategories;
export const selectTransformedLaborers = (state: any) =>
  state.laborSlice.transformedLaborers;
export const selectLaborLoading = (state: any) => state.laborSlice.isLoading;
export const selectLaborError = (state: any) => state.laborSlice.error;
