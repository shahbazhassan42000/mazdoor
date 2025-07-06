// 3rd Party Imports
import { LaborAPI } from "@/store/api";
import { AppDispatch } from "@/store";
// Alias Imports
import { Role } from "@/models/enums";
import { Admin, Labor } from "@/models/interfaces";
import { laborActions } from "./laborSlice";

export const fetchLabors = () => {
  return async (dispatch: AppDispatch) => {
    const response: any = await LaborAPI.fetchUsersByRole(Role.LABOR);

    if (response?.status === 200) {
      const data = await response.json();
      const labors: Labor[] = data;
      dispatch(laborActions.setLabors(labors));
      // get labor types from labors
      const laborTypes = Array.from(new Set(labors.map((labor) => labor.type)));
      dispatch(laborActions.setLaborTypes(laborTypes));
      console.log("Labors fetched successfully:", labors.length);
      console.log("Labor types fetched successfully:", laborTypes);
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
 * Clear all labor data from store
 */
export const clearLaborData = () => {
  return (dispatch: AppDispatch) => {
    dispatch(laborActions.resetAll());
  };
};
