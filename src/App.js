import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import Navigation from "./components/Navigation";
import Router from "./Router";
import "./App.css";

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
