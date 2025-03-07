import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { courseEndpoints } from "../apis";

export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastID = toast.loading("Loading courses...");

  try {
    const response = await apiConnector(
      "GET",
      courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to fetch courses");
    }
    result = response.data.data;
  } catch (err) {
    toast.error("Failed to fetch courses");
  }
  toast.dismiss(toastID);
  return result;
};

export const deleteCourse = async (data, token) => {
  const toastID = toast.loading("Deleting course...");
  try {
    const response = await apiConnector(
      "DELETE",
      courseEndpoints.DELETE_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to delete course");
    }
    toast.success("Course deleted successfully");
  } catch (err) {
    toast.error("Failed to delete course");
  }
  toast.dismiss(toastID);
};

export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastID = toast.loading("Editing course details...");
  try {
    const response = await apiConnector(
      "PUT",
      courseEndpoints.EDIT_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Failed to edit course details");
    }
    toast.success("Course details edited successfully");
    result = response.data.data;
  } catch (err) {
    console.log("EDIT COURSE DETAILS ERROR", err);
    toast.error("Failed to edit course details");
  }
  toast.dismiss(toastID);
};

export const updateSection = async (data, token) => {
  let result = null;
  const toastID = toast.loading("Updating section...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.UPDATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to update section");
    }
    toast.success("Section updated successfully");
    result = response.data.data;
  } catch (err) {
    console.log("UPDATE SECTION ERROR", err);
    toast.error("Failed to update section");
  }
  toast.dismiss(toastID);
  return result;
};

export const createSection = async (data, token) => {
  let result = null;
  const toastID = toast.loading("Creating section...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if(!response?.data?.success) {
      throw new Error("Failed to create section");
    }
    toast.success("Section created successfully");
    result = response?.data?.updatedCourse;
  } catch (err) {
    console.log("CREATE SECTION ERROR", err);
    toast.error("Failed to create section");
  }
  toast.dismiss(toastID);
  return result;
};
