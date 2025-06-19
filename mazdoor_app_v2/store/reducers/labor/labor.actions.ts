import { AppDispatch } from "@/store";
import { LaborAPI } from "@/store/api";
import { laborActions } from "./laborSlice";

export const fetchLabors = () => {
  return async (dispatch: AppDispatch) => {
    const response: any = await LaborAPI.fetchLabors();

    if (response?.status === 200) {
      const data = await response.json();
    } else {
      dispatch(laborActions.setLabors([]));
    }
  };
};
