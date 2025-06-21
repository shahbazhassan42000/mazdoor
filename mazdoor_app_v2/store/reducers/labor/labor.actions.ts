import { AppDispatch } from "@/store";
import { LaborAPI } from "@/store/api";
import { laborActions } from "./laborSlice";
import { INTERFACES } from "@/models";

export const fetchLabors = () => {
  return async (dispatch: AppDispatch) => {
    const response: any = await LaborAPI.fetchLabors();

    if (response?.status === 200) {
      const data = await response.json();
      const labors: INTERFACES.Labor[] = data;
      dispatch(laborActions.setLabors(labors));
      console.log("Labors fetched successfully:", labors.length);
    } else {
      dispatch(laborActions.setLabors([]));
    }
  };
};
