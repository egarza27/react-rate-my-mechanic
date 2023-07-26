import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import Navigation from "./components/Navigation";
import Router from "./Router";
import Login from "./components/Login";
import "./App.css";
import { Switch } from "@mui/base";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
