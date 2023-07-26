import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import cookie from "cookie";
import Register from "./Register";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const userData = {
      username: state.username,
      password: state.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4001/auth/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("You have successfully registered!");
        navigate("/home");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
    let cookies = {};
    document.cookie = cookie.serialize("loggedIn", "true", {
      maxAge: 60 * 3,
    });
    navigate("/");
  };

  return (
    <div className="App">
      <div className="welcome">
        <h1>Welcome to Vehicle Maintenance Scheduler</h1>
        <p>Login or register to get a personalized maintenance schedule.</p>
      </div>
      <Container maxWidth="sm">
        <form className="login-form" onSubmit={login}>
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
          <br></br>
          <Button
            type="submit"
            style={{
              fontFamily: "Zilla Slab",
              backgroundColor: "black",
            }}
            variant="contained"
          >
            Login
          </Button>
          <br></br>

          <Button
            type="submit"
            id="register-button"
            onClick={() => navigate("/register")}
            variant="contained"
            style={{ fontFamily: "Zilla Slab", backgroundColor: "black" }}
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
