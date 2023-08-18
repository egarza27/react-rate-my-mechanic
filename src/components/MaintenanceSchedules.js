import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "cookie";
import jwt_decode from "jwt-decode";
import { DataGrid } from "@mui/x-data-grid";
import "../MaintenanceSchedules.css";

const MaintenanceSchedules = ({ vin }) => {
  const [schedules, setSchedules] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [vins, setVins] = useState([]);
  const [vinTitle, setVinTitle] = useState("");

  const tableTitle = `Maintenance Schedule for ${vin}`;

  const userIdFromToken = () => {
    const cookies = cookie.parse(document.cookie);
    const token = cookies.token || "";

    try {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      console.log("User ID from Token:", userId);
      return userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      return "";
    }
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const userId = userIdFromToken();
        setLoggedInUserId(userId);

        const cookies = cookie.parse(document.cookie);
        const response = await axios.get(
          `http://localhost:4001/vehicles/userId`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        console.log("API call successful:", response.data);
        const vehicles = response.data;

        const vinAndMileage = vehicles.map((vehicle) => {
          return {
            vin: vehicle.vin,
            mileage: vehicle.mileage,
          };
        });

        setVins(vinAndMileage);
        console.log("vehicles:", vinAndMileage);
        if (vinAndMileage.length > 0) {
          setVinTitle(vinAndMileage[0].vin);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCarDetails();
  }, []);

  useEffect(() => {
    if (loggedInUserId && vins.length > 0) {
      const fetchSchedules = async () => {
        try {
          const requests = vins.map((vehicle) =>
            axios.get(
              `http://api.carmd.com/v3.0/maint?vin=${vehicle.vin}&mileage=${vehicle.mileage}`,
              {
                headers: {
                  "content-type": "application/json",
                  authorization:
                    "Basic NDE2ZTIwMTYtZGQ3Ny00MGMwLWE2ZmQtZGU1YzUyMjc4MGRj",
                  "partner-token": "7c3444026ac145f49781a785606af288",
                },
              }
            )
          );

          const responses = await axios.all(requests);
          const schedulesData = responses.map((response) => response.data);
          console.log("API calls successful:", schedulesData);
          setSchedules(schedulesData);
        } catch (error) {
          console.log("Error fetching schedules:", error);
        }
      };

      fetchSchedules();
    }
  }, [loggedInUserId, vins]);

  const columns = [
    { field: "desc", headerName: "Description", flex: 1.5 },
    { field: "due_mileage", headerName: "Due Mileage", flex: 0.8 },
  ];

  const rows = schedules
    .map((scheduleItem, index) =>
      scheduleItem.data.map((item, innerIndex) => ({
        id: `${index}_${innerIndex}`,
        desc: item.desc,
        due_mileage: item.due_mileage,
      }))
    )
    .flat();

  return (
    <div className="table-container">
      <h2 className="maintenance-title">
        Maintenance Schedule for: {vinTitle}
      </h2>
      <br></br>
      <DataGrid rows={rows} columns={columns} autoHeight={true} pageSize={5} />
    </div>
  );
};

export default MaintenanceSchedules;
