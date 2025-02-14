import { createSlice } from "@reduxjs/toolkit";

const category = createSlice({
  name: "category",
  initialState: {
    category: "",
  },
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { addCategory } = category.actions;
export default category.reducer;
