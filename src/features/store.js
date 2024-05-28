import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import axios from "axios";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});

export const axiosServer = axios.create({
  baseURL: "http://localhost:4000",
});
