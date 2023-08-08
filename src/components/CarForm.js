import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookie from "cookie";
import jwt_decode from "jwt-decode";

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
        "http://localhost:4001/vehicles",
        userVehicle,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("You have successfully registered!");
        navigate("/maintenenceSchedules");
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
      <form onSubmit={registerVehicle}>
        <div className="add-listing">
          <TextField
            id="vin"
            placeholder="Vin"
            value={car.vin}
            onChange={handleTextChange}
            variant="standard"
          ></TextField>
          <br></br>
          <TextField
            id="mileage"
            placeholder="Mileage"
            value={car.mileage}
            onChange={handleTextChange}
            variant="standard"
          ></TextField>
          <br></br>
          <Button
            variant="contained"
            type="submit"
            style={{
              fontFamily: "Zilla Slab",
              backgroundColor: "black",
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CarForm;
