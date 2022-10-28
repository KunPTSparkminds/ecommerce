import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export type CartState = {
  step: number;
};

const initialState: CartState = {
  step: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});
export const { setStep } = cartSlice.actions;

export const selectStep = (state: RootState) => state.cart.step;

export default cartSlice.reducer;
