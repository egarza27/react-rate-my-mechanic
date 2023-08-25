import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "cookie";
import "../UserProfile.css";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [vins, setVins] = useState([]);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const cookies = cookie.parse(document.cookie);
        if (cookies.token) {
          const response = await axios.get(
            `https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/users/userDataAndVehicles`,
            {
              headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
            }
          );

          console.log("API call successful:", response.data);

          setUserProfile(response.data[0]);
          setVins(response.data);
        } else {
          setUserProfile([]);
          setVins([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const cookies = cookie.parse(document.cookie);
      if (cookies.token) {
        const response = await axios.get(
          `https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/users/userDataAndVehicles`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );

        console.log("API call successful:", response.data);

        setUserProfile(response.data[0]);
        setVins(response.data);
      } else {
        setUserProfile([]);
        setVins([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditVinSave = async (vin, newMileage) => {
    try {
      console.log("Editing mileage for VIN:", vin);
      console.log("New mileage value:", newMileage);
      const cookies = cookie.parse(document.cookie);
      await axios.put(
        `https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/vehicles/updateMileage`,
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

  const handleEditUserSave = async () => {
    try {
      const cookies = cookie.parse(document.cookie);
      console.log("Edited User Data:", editedUser);
      await axios.put(
        `https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/users/updateUserProfile`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("User profile update request sent");
      fetchUserProfile();
    } catch (error) {
      console.log("Error updating user profile:", error);
    }
  };

  const handleDeleteVehicle = async (vinToDelete) => {
    try {
      const cookies = cookie.parse(document.cookie);
      await axios.delete(
        `https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/vehicles/deleteVehicleByVin`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          data: {
            vin: vinToDelete,
          },
        }
      );
      console.log("Vehicle deleted");

      fetchUserProfile();
    } catch (error) {
      console.log("Error deleting vehicle:", error);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h2 className="user-profile-title">{`${userProfile.first_name}'s Profile`}</h2>
        <div className="user-info">
          <p>
            First Name:
            <input
              type="text"
              value={userProfile.first_name || ""}
              onChange={(event) => {
                const newFirstName = event.target.value;
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  first_name: newFirstName,
                }));
                setEditedUser((prevEditedUser) => ({
                  ...prevEditedUser,
                  first_name: newFirstName,
                }));
              }}
              className="user-input"
            />
          </p>
          <p>
            Last Name:
            <input
              type="text"
              value={userProfile.last_name || ""}
              onChange={(event) => {
                const newLastName = event.target.value;
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  last_name: newLastName,
                }));
                setEditedUser((prevEditedUser) => ({
                  ...prevEditedUser,
                  last_name: newLastName,
                }));
              }}
              className="user-input"
            />
          </p>
          <p>
            Username:
            <input
              type="text"
              value={userProfile.username || ""}
              onChange={(event) => {
                const newUsername = event.target.value;
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  username: newUsername,
                }));
                setEditedUser((prevEditedUser) => ({
                  ...prevEditedUser,
                  username: newUsername,
                }));
              }}
              className="user-input"
            />
          </p>
        </div>
        <br></br>
        <button onClick={handleEditUserSave} className="user-button-save">
          Save Profile
        </button>
      </div>

      <div className="user-vehicles-card">
        <h2 className="user-profile-title">{`${userProfile.first_name}'s Vehicles`}</h2>
        {vins.map((vehicle, index) => (
          <div key={index} className="vehicle-card">
            <p className="vehicle-info">VIN: {vehicle.vin}</p>
            <p className="vehicle-info">Current Mileage: {vehicle.mileage}</p>
            <p className="update-mileage">
              Update Mileage:
              <input
                type="text"
                value={vehicle.mileage || ""}
                onChange={(event) => {
                  const newMileage = event.target.value;
                  handleEditVinSave(vehicle.vin, newMileage);
                }}
                className="vehicle-input"
              />
            </p>
            <div className="delete-button-container">
              <button
                className="delete-button"
                onClick={() => handleDeleteVehicle(vehicle.vin)}
              >
                Delete Vehicle
              </button>
            </div>
            <br></br>
          </div>
        ))}
      </div>
      <br></br>
      <div className="add-vehicle-button-container">
        <Link to="/carForm" className="add-vehicle-button">
          Add New Vehicle
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
