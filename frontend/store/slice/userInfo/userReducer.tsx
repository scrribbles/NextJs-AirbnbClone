import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState: {
    id: "",
    email: "",
    loggedIn: false,
    fullName: "",
  },
  reducers: {
    /**
		 * Handles user login by setting the user information in the state.
		 * @param {Object} state - The current state of the user.
		 * @param {Object} action - The action object containing the payload with user information.
		 * @param {string} action.payload.id - The user's ID.
		 * @param {string} action.payload.email - The user's email.
		// This reducer function resets the user state to its initial values, effectively logging the user out.
		logout: (state) => {
		 */
    loginUser: (state, action) => {
      state.id = action.payload.user_id;
      state.email = action.payload.email;
      state.loggedIn = true;
      state.fullName = action.payload.full_name;
    },
    logoutUser: (state) => {
      state.id = "";
      state.email = "";
      state.loggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userInfoSlice.actions;
export default userInfoSlice.reducer;
