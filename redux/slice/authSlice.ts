import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export type AuthState = {
  isLoggedIn: boolean;
  currentUser: any;
};

const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});
export const { setIsLoggedIn, setCurrentUser } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export default authSlice.reducer;
