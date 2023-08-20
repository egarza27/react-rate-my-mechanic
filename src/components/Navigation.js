import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import cookie from "cookie";

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!cookie.parse(document.cookie).loggedIn;

  return (
    <AppBar position="relative" enableColorOnDark>
      <Toolbar className="navbar">
        <IconButton color="inherit"></IconButton>
        <Typography
          variant="h6"
          style={{ flexGrow: "1", fontFamily: "Roboto" }}
        >
          WheelsUp KeepUp
        </Typography>
        <ul className="nav-links">
          {isLoggedIn && (
            <>
              <li>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/carForm">
                  Add
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/maintenanceSchedules">
                  Maintenance Schedules
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/userProfile">
                  My Profile
                </Link>
              </li>
              <li
                className="nav-link"
                onClick={() => {
                  document.cookie = cookie.serialize("loggedIn", null, {
                    maxAge: 0,
                  });
                  navigate("/login");
                }}
              >
                Logout
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
