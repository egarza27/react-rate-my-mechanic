import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "cookie";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [vins, setVins] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const cookies = cookie.parse(document.cookie);
      const response = await axios.get(
        `http://localhost:4001/users/userDataAndVehicles`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      console.log("API call successful:", response.data);

      setUserProfile(response.data[0]);
      setVins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditSave = async (vin, newMileage) => {
    try {
      console.log("Editing mileage for VIN:", vin);
      console.log("New mileage value:", newMileage);
      const cookies = cookie.parse(document.cookie);
      await axios.put(
        `http://localhost:4001/vehicles/updateMileage`,
        {
          mileage: newMileage,
          vin: vin,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("Mileage update request sent");
      fetchUserProfile();
    } catch (error) {
      console.log("Error updating mileage:", error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>First Name: {userProfile.first_name}</p>
      <p>Last Name: {userProfile.last_name}</p>
      <p>Username: {userProfile.username}</p>
      <h2>User's Vehicles</h2>
      {vins.map((vehicle, index) => (
        <div key={index}>
          <p>VIN: {vehicle.vin}</p>
          <p>Mileage: {vehicle.mileage}</p>
          <input
            type="text"
            value={vehicle.mileage}
            onChange={(event) => {
              const newMileage = event.target.value;
              console.log("Input value change:", newMileage);
              handleEditSave(vehicle.vin, newMileage);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default UserProfile;

// const Test = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4001/vehicles");

//         console.log("API call successful:", response.data);

//         setData(response.data);
//       } catch (error) {
//         console.log("Error fetching schedules:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log(data);
//   return <div>test</div>;
// };

// const Test2 = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://api.carmd.com/v3.0/maint?vin=1GNALDEK9FZ108495&mileage=100000`,
//           {
//             headers: {
//               "content-type": "application/json",
//               authorization:
//                 "Basic NDE2ZTIwMTYtZGQ3Ny00MGMwLWE2ZmQtZGU1YzUyMjc4MGRj",
//               "partner-token": "7c3444026ac145f49781a785606af288",
//             },
//           }
//         );
//         console.log(response.data);
//       } catch (error) {
//         console.log("Error fetching schedules:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   console.log(data);
//   return <div>test</div>;
// };

// export default Test;
