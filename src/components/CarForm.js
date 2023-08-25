import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "cookie";
import jwt_decode from "jwt-decode";
import "../CarForm.css";

const CarForm = () => {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    vin: "",
    mileage: "",
  });

  console.log(car);

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

  const handleTextChange = (e) => {
    const newState = { ...car };
    newState[e.target.id] = e.target.value;
    setCar(newState);
  };

  const registerVehicle = async (e) => {
    e.preventDefault();

    const userId = userIdFromToken();

    const userVehicle = {
      user_id: userId,
      vin: car.vin,
      mileage: car.mileage,
    };

    console.log("userVehicle payload:", userVehicle);

    try {
      const response = await axios.post(
        "https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/vehicles",
        userVehicle,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("You have successfully registered!");
        navigate("/maintenanceSchedules");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <Container>
      <div className="car-form-container">
        <p className="login-description">
          Enter vehicle information below for a personalized maintenance
          schedule.
        </p>
        <form onSubmit={registerVehicle}>
          <div className="car-form">
            <TextField
              label="Vin"
              id="vin"
              value={car.vin}
              onChange={handleTextChange}
              variant="standard"
            ></TextField>
            <br></br>
            <TextField
              id="mileage"
              label="Mileage"
              value={car.mileage}
              onChange={handleTextChange}
              variant="standard"
            ></TextField>
            <br></br>
            <br></br>
            <Button
              style={{
                fontFamily: "Zilla Slab",
                backgroundColor: "black",
              }}
              variant="contained"
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CarForm;
