import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "cookie";
import "../UserProfile.css";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [vins, setVins] = useState([]);
  const [editedUser, setEditedUser] = useState({});

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

  const handleEditVinSave = async (vin, newMileage) => {
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

  const handleEditUserSave = async () => {
    try {
      const cookies = cookie.parse(document.cookie);
      await axios.put(
        `http://localhost:4001/users/updateUserProfile`,
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
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  first_name: event.target.value,
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
                setUserProfile((prevProfile) => ({
                  ...prevProfile,
                  last_name: event.target.value,
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
                setEditedUser((prevEditedUser) => ({
                  ...prevEditedUser,
                  username: newUsername,
                }));
              }}
            />
          </p>
        </div>
      </div>

      <button onClick={handleEditUserSave}>Save Profile</button>

      <div className="user-vehicles-card">
        <h2 className="user-profile-title">{`${userProfile.first_name}'s Vehicles`}</h2>
        {vins.map((vehicle, index) => (
          <div key={index} className="vehicle-card">
            <p className="vehicle-info">VIN: {vehicle.vin}</p>
            <p className="vehicle-info">Mileage: {vehicle.mileage}</p>
            <input
              type="text"
              value={vehicle.mileage}
              onChange={(event) => {
                const newMileage = event.target.value;
                handleEditVinSave(vehicle.vin, newMileage);
              }}
              className="vehicle-input"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import cookie from "cookie";
// import EditModal from "./EditModal";

// const UserProfile = () => {
//   const [userProfile, setUserProfile] = useState({});
//   const [vins, setVins] = useState([]);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [editedVin, setEditedVin] = useState(null);

//   const fetchUserProfile = async () => {
//     try {
//       const cookies = cookie.parse(document.cookie);
//       const response = await axios.get(
//         `http://localhost:4001/users/userDataAndVehicles`,
//         {
//           headers: {
//             Authorization: `Bearer ${cookies.token}`,
//           },
//         }
//       );

//       const user = response.data[0];
//       const vehicles = response.data;

//       const vinAndMileage = vehicles.map((vehicle) => {
//         return {
//           vin: vehicle.vin,
//           mileage: vehicle.mileage,
//         };
//       });

//       setUserProfile(user);
//       setVins(vinAndMileage);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const handleEditMileageClick = (vin) => {
//     setEditModalOpen(true);
//     // Set the current vehicle's vin in the EditModal component's state
//     setEditedVin(vin);
//   };

//   const handleMileageSave = async (vin, newMileage) => {
//     try {
//       const cookies = cookie.parse(document.cookie);
//       const vehicleUpdates = [{ vin, mileage: newMileage }];
//       await axios.put(
//         `http://localhost:4001/users/userDataAndVehicles`,
//         { vehicleUpdates },
//         {
//           headers: {
//             Authorization: `Bearer ${cookies.token}`,
//           },
//         }
//       );
//       // Close the modal and refresh the user profile after mileage update
//       setEditModalOpen(false);
//       fetchUserProfile();
//     } catch (error) {
//       console.log("Error updating mileage:", error);
//       alert("There was an error updating mileage. Please try again.");
//     }
//   };

//   const handleEditProfileClick = () => {
//     setEditModalOpen(true);
//   };

//   useEffect(() => {
//     if (isEditModalOpen && Object.keys(userProfile).length > 0) {
//       // Only open the modal if userProfile is not empty
//       console.log("Opening EditModal with user data:", userProfile);
//     }
//   }, [isEditModalOpen, userProfile]);

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <p>First Name: {userProfile.first_name}</p>
//       <p>Last Name: {userProfile.last_name}</p>
//       <p>Username: {userProfile.username}</p>

//       <h2>User's Vehicles</h2>
//       {vins.map((vehicle, index) => (
//         <div key={index}>
//           <p>VIN: {vehicle.vin}</p>
//           <p>Mileage: {vehicle.mileage}</p>
//           <button onClick={() => handleEditMileageClick(vehicle.vin)}>
//             Edit Mileage
//           </button>
//         </div>
//       ))}

//       <button onClick={handleEditProfileClick}>Edit Profile</button>

//       {isEditModalOpen && (
//         <EditModal
//           onClose={() => setEditModalOpen(false)}
//           user={userProfile}
//           fetchUserProfile={fetchUserProfile}
//         />
//       )}
//     </div>
//   );
// };

// export default UserProfile;
