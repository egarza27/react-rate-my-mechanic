import { combineReducers } from "redux";

const carReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CAR_INFO":
      console.log(state, action);
      return { ...state, carInfo: action.payload };
    case "SET_MAINTENANCE_SCHEDULE":
      return {
        ...state,
        maintenanceSchedule: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({ carReducer });
