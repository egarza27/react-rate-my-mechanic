import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "cookie";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [vins, setVins] = useState([]);

  const handleDelete = async (vinToDelete) => {
    try {
      const cookies = cookie.parse(document.cookie);
      await axios.delete(`http://localhost:4001/vehicles/${vinToDelete}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      fetchUserProfile();
    } catch (error) {
      console.log(error);
    }
  };

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

      const user = response.data[0];
      const vehicles = response.data;

      const vinAndMileage = vehicles.map((vehicle) => {
        return {
          vin: vehicle.vin,
          mileage: vehicle.mileage,
        };
      });

      setUserProfile(user);
      setVins(vinAndMileage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

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
          <button onClick={() => handleDelete(vehicle.vin)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
