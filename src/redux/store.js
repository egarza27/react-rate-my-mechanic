import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers";
import initialState from "./state";

const store = configureStore({
  reducer: reducers,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
