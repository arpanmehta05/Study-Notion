import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slice/ProfileSlice";
import { apiConnector } from "../ApiConnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching user details...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        profileEndpoints.GET_USER_DETAILS_API,
        null,
        { Authorization: `Bearer ${token}` }
      );
      if (response.status !== 200 || !response.data || !response.data.message) {
        throw new Error("Unexpected response from server");
      }
      const userImage = response.data.userDetail.image
        ? response.data.userDetail.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetail.firstName} ${response.data.userDetail.lastName}`;
      dispatch(setUser({ ...response.data.userDetail, image: userImage }));
    } catch (err) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", err);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getEnrolledCourses(token) {
  const toastId = toast.loading("Fetching enrolled courses...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (
      response.status !== 200 ||
      !response.data ||
      response.data.success !== true
    ) {
      throw new Error("Unexpected response from server");
    }

    result = response.data.data;
  } catch (err) {
    console.log("GET_ENROLLED_COURSES API ERROR............", err);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Fetching instructor data...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_INSTRUCTION_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    result = response.datacourses;
  } catch (err) {
    console.log("GET_INSTRUCTOR_DATA API ERROR............", err);
    toast.error("Could Not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
