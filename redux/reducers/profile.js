import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../actions/profile";

const initialState = {
  balance: null,
  email: null,
  firstName: null,
  id: null,
  lastName: null,
  phoneNumber: null,
  picture: null,
  pin: null,
};

const profileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: (state, payload) =>  {
      return initialState
    }
  },
  extraReducers: (build) => {
    build.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.balance = payload.balance;
      state.email = payload.email;
      state.firstName = payload.firstName;
      state.id = payload.id;
      state.lastName = payload.lastName;
      state.phoneNumber = payload.phoneNumber;
      state.picture = payload.picture;
      state.pin = payload.pin;
    });
  },
});

export const { resetProfile } = profileReducer.actions

export default profileReducer.reducer;
