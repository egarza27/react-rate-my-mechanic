import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "cookie";
import jwt_decode from "jwt-decode";
import { DataGrid } from "@mui/x-data-grid";
import "../MaintenanceSchedules.css";
import { styled } from "@mui/system";

const MaintenanceSchedules = ({ vin }) => {
  const [schedules, setSchedules] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [vins, setVins] = useState([]);
  const [vinTitle, setVinTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedVin, setSelectedVin] = useState("");

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

  const getCurrentMileage = (vin) => {
    const vinObj = vins.find((vehicle) => vehicle.vin === vin);
    return vinObj ? vinObj.mileage : 0;
  };

  const DropdownContainer = styled("div")({
    marginBottom: "1rem",
  });

  const VinDropdown = styled("select")({
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white",
    width: "100%",
    outline: "none",
  });

  const TableContainer = styled("div")({
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  });

  const MaintenanceTitle = styled("h2")({
    fontSize: "1.5rem",
    marginBottom: "1rem",
  });

  const fetchSchedulesSequentially = async () => {
    try {
      const timeout = 300000;

      for (const vehicle of vins) {
        console.log(
          `Making request for VIN: ${vehicle.vin}, Mileage: ${vehicle.mileage}`
        );

        const response = await axios.get(
          `https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/api/proxy?vin=${vehicle.vin}&mileage=${vehicle.mileage}`,
          {
            timeout,
          }
        );

        console.log(
          `Received response for VIN: ${vehicle.vin}, Mileage: ${vehicle.mileage}`
        );

        const scheduleData = response.data;
        setSchedules((prevSchedules) => [...prevSchedules, scheduleData]);
      }

      setLoading(false);
    } catch (error) {
      console.log("Error fetching schedules:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const userId = userIdFromToken();
        setLoggedInUserId(userId);

        const cookies = cookie.parse(document.cookie);
        const response = await axios.get(
          `https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/vehicles/userId`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        console.log("API call successful:", response.data);
        const vehicles = response.data;

        const vinAndMileage = vehicles.map((vehicle) => ({
          vin: vehicle.vin,
          mileage: vehicle.mileage,
        }));

        setVins(vinAndMileage);
        console.log("vehicles:", vinAndMileage);
        if (vinAndMileage.length > 0) {
          setVinTitle(vinAndMileage[0].vin);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching car details:", error);
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, []);

  useEffect(() => {
    if (loggedInUserId && vins.length > 0) {
      fetchSchedulesSequentially();
    }
  }, [loggedInUserId, vins]);

  const rows = schedules.flatMap((scheduleItem, index) => {
    if (scheduleItem && scheduleItem.data && Array.isArray(scheduleItem.data)) {
      return scheduleItem.data
        .filter(
          (item) => item.due_mileage >= getCurrentMileage(vins[index].vin)
        )
        .map((item, innerIndex) => ({
          id: `${index}_${innerIndex}`,
          vin: vins[index].vin,
          desc: item.desc,

          due_mileage: item.due_mileage,
        }));
    } else {
      return [];
    }
  });

  const filteredRows = selectedVin
    ? rows.filter(
        (row) =>
          row.vin === selectedVin && row.due_mileage >= getCurrentMileage(vin)
      )
    : rows.filter((row) => row.due_mileage >= getCurrentMileage(vin));

  const columns = [
    { field: "vin", headerName: "VIN", flex: 1 },
    { field: "desc", headerName: "Description", flex: 1.5 },
    { field: "due_mileage", headerName: "Due Mileage", flex: 0.8 },
  ];

  return (
    <TableContainer>
      <DropdownContainer>
        <VinDropdown
          value={selectedVin}
          onChange={(e) => setSelectedVin(e.target.value)}
        >
          <option value="">Select a VIN</option>
          {vins.map((vinObj) => (
            <option key={vinObj.vin} value={vinObj.vin}>
              {vinObj.vin}
            </option>
          ))}
        </VinDropdown>
      </DropdownContainer>
      <MaintenanceTitle>
        Maintenance Schedule for: {selectedVin || "All VINs"}
      </MaintenanceTitle>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight={true}
          pageSize={5}
        />
      )}
    </TableContainer>
  );
};

export default MaintenanceSchedules;
