import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/UserSlice"
export default configureStore({
  reducer: {
    users: userReducer
  }
});
