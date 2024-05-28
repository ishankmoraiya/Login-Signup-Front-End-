import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");
const name = localStorage.getItem("name");
const email = localStorage.getItem("email");
const password = localStorage.getItem("password");
const dob = localStorage.getItem("dob");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token,
    name: name,
    email: email,
    password: password,
    dob: dob,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.dob = action.payload.dob;
    },
    removeToken: (state, action) => {
      state.token = null;
      state.name = null;
      state.email = null;
      state.password = null;
      state.dob = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
