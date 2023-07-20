import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CarForm = (props) => {
  const navigate = useNavigate();
  const [car, setCar] = useState({
    open: false,
    year: "",
    make: "",
    model: "",
    mileage: "",
    vin: "",
  });

  const handleTextChange = (e) => {
    const newState = { ...car };
    newState[e.target.id] = e.target.value;
    setCar(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...car };
    payload.id = uuidv4();
    console.log(payload);
    delete payload.open;
    props.setCarInfo(payload);
    navigate("/maintenanceSchedules");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="add-listing">
          <TextField
            id="year"
            placeholder="Year"
            value={car.year}
            onChange={handleTextChange}
            variant="standard"
          ></TextField>
          <br></br>
          <TextField
            id="make"
            placeholder="Make"
            value={car.make}
            onChange={handleTextChange}
            variant="standard"
          ></TextField>
          <br></br>
          <TextField
            id="model"
            placeholder="Model"
            value={car.model}
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
          <TextField
            id="vin"
            placeholder="Vin"
            value={car.vin}
            onChange={handleTextChange}
            variant="standard"
          ></TextField>
          <br></br>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CarForm;
