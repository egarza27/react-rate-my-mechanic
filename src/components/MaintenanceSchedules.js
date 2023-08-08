import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "cookie";
import jwt_decode from "jwt-decode";
import { DataGrid } from "@mui/x-data-grid";

const MaintenanceSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [vins, setVins] = useState([]);

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

        const cookies = cookie.parse(document.cookie); // Define cookies here
        const response = await axios.get(
          `http://localhost:4001/vehicles/test`,
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
    { field: "desc", headerName: "Description", width: 250 },
    { field: "due_mileage", headerName: "Due Mileage", width: 150 },
    {
      field: "repair.repair_difficulty",
      headerName: "Repair Difficulty",
      width: 180,
    },
    {
      field: "repair.part_cost",
      headerName: "Part Cost",
      width: 180,
    },
  ];

  const rows = schedules
    .map((scheduleItem, index) =>
      scheduleItem.data.map((item, innerIndex) => ({
        id: `${index}_${innerIndex}`,
        desc: item.desc,
        due_mileage: item.due_mileage,
        repair_difficulty: item.repair.repair_difficulty,
        part_cost: item.repair.part_cost,
      }))
    )
    .flat();

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default MaintenanceSchedules;
