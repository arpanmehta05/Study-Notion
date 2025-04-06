const BASE_URL =
  import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3000/api/v1";

export const categories = {
  CATEGORIES_API: `${BASE_URL}/course/showAllCategories`,
};

export const endpoints = {
  LOGIN_API: `${BASE_URL}/auth/login`,
  SENDOTP: `${BASE_URL}/auth/sendotp`,
  SIGNUP_API: `${BASE_URL}/auth/signup`,
  RESET_PASSWORD_TOKEN: `${BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
};

export const contactUs = {
  CONTACT_US_API: `${BASE_URL}/contact/contactUs`,
};

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateDisplayPicture`,
  UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`,
  CHANGE_PASSWORD_API: `${BASE_URL}/auth/changepassowrd`,
  DELETE_PROFILE_API: `${BASE_URL}/profile/deleteProfile`,
};

export const profileEndpoints = {
  GET_USER_DETAILS_API: `${BASE_URL}/profile/getUserDetails`,
  GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/getEnrolledCourses`,
  GET_INSTRUCTION_DATA_API: `${BASE_URL}/profile/instructorDashboard`,
};

export const courseEndpoints = {
  GET_ALL_INSTRUCTOR_COURSES_API: `${BASE_URL}/course/getInstructorCourses`,
  DELETE_COURSE_API: `${BASE_URL}/course/deleteCourse`,
  GET_ALL_COURSES_API: `${BASE_URL}/course/getAllCourses`,
  GET_COURSE_DETAILS_API: `${BASE_URL}/course/getCourseDetails`,
  EDIT_COURSE_API: `${BASE_URL}/course/editCourse`,
  COURSE_CATEGORY_API: `${BASE_URL}/course/showAllCategories`,
  CREATE_COURSE_API: `${BASE_URL}/course/createCourse`,
  CREATE_SECTION_API: `${BASE_URL}/course/addSection`,
  CREATE_SUBSECTION_API: `${BASE_URL}/course/addSubSection`,
  UPDATE_SECTION_API: `${BASE_URL}/course/updateSection`,
  UPDATE_SUBSECTION_API: `${BASE_URL}/course/updateSubSection`,
  DELETE_SECTION_API: `${BASE_URL}/course/deleteSection`,
  DELETE_SUBSECTION_API: `${BASE_URL}/course/deleteSubSection`,
  GET_FULL_COURSE_DETAILS_API: `${BASE_URL}/course/getFullCourseDetails`,
  LECTURE_COMPLETION_API: `${BASE_URL}/course/updateCourseProgress`,
};

export const studentEndpoints = {};

export const RatingEndpoints = {
  REVIEW_DETAILS_API: `${BASE_URL}/rating/getReviews`,
};

export const catalogeData = {
  GET_CATALOGUE_DATA_API: `${BASE_URL}/course/getCategoryPageDetails`,
};

export const contactUsEndpoints = {
  CONTACT_US_API: `${BASE_URL}/contact/contactUs`,
};