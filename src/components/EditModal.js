import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "cookie";

const EditModal = ({ isOpen, onClose, user, fetchUserProfile }) => {
  const [editedData, setEditedData] = useState({
    first_name: "",
    last_name: "",
    username: "",
  });

  useEffect(() => {
    // Update editedData when the user prop changes
    setEditedData({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      username: user.username || "",
    });
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Input changed:", name, value);
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const cookies = cookie.parse(document.cookie);
      console.log("Sending data:", editedData);
      await axios.put(
        `http://localhost:4001/users/updateUserData`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("Data sent successfully");
      fetchUserProfile();
    } catch (error) {
      console.log("Error:", error);
      alert("There was an error saving your changes. Please try again.");
    }
  };

  console.log("Rendered with data:", editedData);

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Edit User Profile</h2>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={editedData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={editedData.last_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={editedData.username}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
