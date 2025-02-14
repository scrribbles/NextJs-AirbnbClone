import { createSlice } from "@reduxjs/toolkit";

const bookingFilterSlice = createSlice({
  name: "bookingFilter",
  initialState: {
    destination: "",
    checkIn: "",
    checkOut: "",
    adults: 0,
    children: 0,
    infants: 0,
    pets: false,
  },
  reducers: {
    addDestination: (state, action) => {
      state.destination = action.payload;
    },
    addCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    addCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
    addAdults: (state, action) => {
      state.adults = action.payload;
    },
    addChildren: (state, action) => {
      state.children = action.payload;
    },
    addInfants: (state, action) => {
      state.infants = action.payload;
    },
    addPets: (state, action) => {
      state.pets = action.payload;
    },

    // category filter
  },
});

export const {
  addCheckIn,
  addCheckOut,
  addDestination,
  addAdults,
  addChildren,
  addInfants,
  addPets,
} = bookingFilterSlice.actions;
export default bookingFilterSlice.reducer;
