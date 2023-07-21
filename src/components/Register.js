import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";

const Register = ({ navigate }) => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const register = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: state.first_name,
      last_name: state.last_name,
      username: state.username,
      password: state.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4001/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("You have successfully registered!");
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={register}>
          <TextField
            required
            onChange={handleTextChange}
            value={state.first_name}
            name="first_name"
            label="First Name"
            type="text"
            variant="standard"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.last_name}
            name="last_name"
            label="Last Name"
            type="text"
            variant="standard"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.username}
            name="username"
            label="Username"
            type="text"
            variant="standard"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.password}
            name="password"
            label="Password"
            type="password"
            variant="standard"
          />
          <br />
          <Button
            type="submit"
            className="register-button"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Register;