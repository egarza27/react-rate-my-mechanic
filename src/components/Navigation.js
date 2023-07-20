import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import cookie from "cookie";

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!cookie.parse(document.cookie).loggedIn;

  return (
    <AppBar position="relative" sx={{ backgroundColor: "green" }}>
      <Toolbar>
        <IconButton color="inherit"></IconButton>
        <Typography variant="h6" style={{ flexGrow: "1" }}>
          Title
        </Typography>
        <ul className="nav-list">
          {isLoggedIn && (
            <>
              <li className="nav-list-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-list-item">
                <Link to="/carForm">Add</Link>
              </li>
              <li className="nav-list-item">
                <Link to="/maintenanceSchedules">Maintenance Schedules</Link>
              </li>

              <li
                className="nav-list-item"
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
              <li className="nav-list-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-list-item">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
