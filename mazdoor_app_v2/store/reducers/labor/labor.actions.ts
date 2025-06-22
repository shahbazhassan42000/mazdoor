// 3rd Party Imports
import { AppDispatch } from "@/store";
import { LaborAPI } from "@/store/api";
// Alias Imports
import { Role } from "@/models/enums";
import { Admin, Labor } from "@/models/interfaces";
import { laborActions } from "@/store/reducers";

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
