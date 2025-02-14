import { createSlice } from "@reduxjs/toolkit";

const filter = createSlice({
  name: "filter",
  initialState: {
    minPrice: 0,
    maxPrice: 0,
    rooms: null,
    beds: null,
    guests: null,
    bookingOptions: "",
    amenities: [],
  },
  reducers: {
    minPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    maxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    rooms: (state, action) => {
      state.rooms = action.payload;
    },
    beds: (state, action) => {
      state.beds = action.payload;
    },
    guests: (state, action) => {
      state.guests = action.payload;
    },
    bookingOptions: (state, action) => {
      state.bookingOptions = action.payload;
    },
    amenities: (state, action) => {
      state.amenities = action.payload;
    },
    resetFilter: (state) => {
      state.minPrice = 0;
      state.maxPrice = 1000;
      state.rooms = 1;
      state.beds = 1;
      state.guests = 1;
      state.bookingOptions = "";
      state.amenities = [];
    },
  },
});

export const {
  minPrice,
  maxPrice,
  rooms,
  beds,
  guests,
  bookingOptions,
  amenities,
} = filter.actions;
export default filter.reducer;
