import { combineReducers } from "@reduxjs/toolkit";
import bookingFilterSlice from "../slice/bookingFilterReducer/bookingFilterReducer";
import userInfoSlice from "../slice/userInfo/userReducer";
import category from "../slice/category";
import filter from "../slice/filter";

const rootReducer = combineReducers({
  bookingFilter: bookingFilterSlice,
  userAuth: userInfoSlice,
  category: category,
  filter: filter,
});

export default rootReducer;
