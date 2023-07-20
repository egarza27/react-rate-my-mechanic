import axios from "axios";

export const setCarInfo = (carInfo) => ({
  type: "SET_CAR_INFO",
  payload: carInfo,
});

export const setMaintenanceSchedule = (schedule) => ({
  type: "SET_MAINTENANCE_SCHEDULE",
  payload: schedule,
});

// export const fetchMaintenanceSchedule = (carInfo) => {
//   return (dispatch) => {
//     axios
//       .post("http://api.carmd.com/v3.0/maintlist", carInfo, {
//         headers: {
//           "content-type": "application/json",
//           authorization: "NDE2ZTIwMTYtZGQ3Ny00MGMwLWE2ZmQtZGU1YzUyMjc4MGRj",
//           "partner-token": "7c3444026ac145f49781a785606af288",
//         },
//       })
//       .then((response) => {
//         const maintenanceSchedule = response.data.maintenanceSchedule;

//         dispatch({
//           type: "FETCH_MAINTENANCE_SCHEDULE_SUCCESS",
//           payload: maintenanceSchedule,
//         });
//       })
//       .catch((error) => {
//         dispatch({
//           type: "FETCH_MAINTENANCE_SCHEDULE_FAILURE",
//           payload: error.message,
//         });
//       });
//   };
// };
