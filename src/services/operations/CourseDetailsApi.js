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
      "POST",
      courseEndpoints.EDIT_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
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
  return result;
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
    result = response?.data?.updatedCourse;
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
    if (!response?.data?.success) {
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

export const updatesubSection = async (data, token) => {
  let result = null;
  const toastID = toast.loading("Updating subsection...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.UPDATE_SUBSECTION_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to update subsection");
    }
    toast.success("Subsection updated successfully");
    result = response?.data?.data;
  } catch (err) {
    console.log("UPDATE SUBSECTION ERROR", err);
    toast.error("Failed to update subsection");
  }
  toast.dismiss(toastID);
  return result;
};

export const createSubSection = async (data, token) => {
  let result = null;
  const toastID = toast.loading("Creating subsection...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to create subsection");
    }
    toast.success("Subsection created successfully");
    result = response?.data?.section;
  } catch (err) {
    console.log("CREATE SUBSECTION ERROR", err);
    toast.error("Failed to create subsection");
  }
  toast.dismiss(toastID);
  return result;
};

export const deleteSection = async (data, token) => {
  let result = null;
  const toastID = toast.loading("Deleting section...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to delete section");
    }
    toast.success("Section deleted successfully");
    result = response?.data?.data;
  } catch (err) {
    console.log("DELETE SECTION ERROR", err);
    toast.error("Failed to delete section");
  }
  toast.dismiss(toastID);
  return result;
};

export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Deleting subsection...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error("Failed to delete subsection");
    }
    toast.success("Subsection deleted successfully");
    result = response?.data?.data;
  } catch (err) {
    console.log("DELETE SUBSECTION ERROR", err);
    toast.error("Failed to delete subsection");
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseCategories = async () => {
  let toastId = toast.loading("Fetching categories...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      courseEndpoints.COURSE_CATEGORY_API
    );
    if (!response?.data?.success) {
      throw new Error("Failed to fetch categories");
    }
    result = response?.data?.data;
  } catch (err) {
    console.log("FETCH CATEGORIES ERROR", err);
    toast.error("Failed to fetch categories");
  }
  toast.dismiss(toastId);
  return result;
};

export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Adding course details...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.Success) {
      throw new Error("Failed to add course details");
    }
    toast.success("Course details added successfully");
    result = response?.data?.data;
  } catch (err) {
    console.log("ADD COURSE DETAILS ERROR", err);
    toast.error("Failed to add course details");
  }
  toast.dismiss(toastId);
  return result;
};

export const getFullDetailsofCourse = async (courseId, token) => {
  const toastId = toast.loading("Fetching course details...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.GET_FULL_COURSE_DETAILS_API,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (err) {
    console.log("FETCH COURSE DETAILS ERROR", err);
    result = err.response.data;
  }
  toast.dismiss(toastId);
  return result;
};

export const fetchCourseDetail = async(CourseId) => {
  const toastId = toast.loading("Fetching course details...");
  let result = null;
  try {
    const response = await apiConnector("POST",courseEndpoints.GET_COURSE_DETAILS_API,{CourseId})
    if(!response.data.success)
    {
      throw new Error(response.data.message)
    }
    result = response.data
  }
  catch (err) {
    console.log("FETCH COURSE DETAILS ERROR", err);
    result = err.response.data
  }
  toast.dismiss(toastId);
  return result
}