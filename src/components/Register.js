import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  console.log(state);

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
        "https://wheels-up-keep-up-d0e3ff35790c.herokuapp.com/auth/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("You have successfully registered!");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div>
      <Container maxWidth="sm" className="login-container">
        <form className="login-form" onSubmit={register}>
          <br></br>
          <TextField
            required
            onChange={handleTextChange}
            value={state.first_name}
            name="first_name"
            label="First Name"
            type="text"
            variant="standard"
            className="login-input"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.last_name}
            name="last_name"
            label="Last Name"
            type="text"
            variant="standard"
            className="login-input"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.username}
            name="username"
            label="Username"
            type="text"
            variant="standard"
            className="login-input"
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.password}
            name="password"
            label="Password"
            type="password"
            variant="standard"
            className="login-input"
          />
          <br />
          <Button
            type="submit"
            className="register-button"
            variant="contained"
            style={{
              fontFamily: "Zilla Slab",
              backgroundColor: "black",
            }}
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Register;
