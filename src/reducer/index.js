import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import profileSlice from "../slice/ProfileSlice";
import cartSlice from "../slice/CartSlice";
import courseSlice from "../slice/courseSlice";
import viewCourseSlice from "../slice/viewCourseSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  cart: cartSlice.reducer,
  course: courseSlice.reducer,
  viewCourse: viewCourseSlice.reducer,
});
export default rootReducer;
