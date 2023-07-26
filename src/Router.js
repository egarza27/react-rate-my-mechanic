import React from "react";
import { Route, Routes } from "react-router-dom";
import CarForm from "./containers/CarForm";
import Home from "./components/Home";
import Login from "./components/Login";
import Test2 from "./components/Test";
import Register from "./components/Register";
import MaintenanceSchedules from "./containers/MaintenanceSchedules";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/carForm" element={<CarForm />} />
      <Route path="/test" element={<Test2 />} />
      <Route path="/register" element={<Register />} />
      <Route path="/maintenanceSchedules" element={<MaintenanceSchedules />} />
    </Routes>
  );
};

export default Router;
