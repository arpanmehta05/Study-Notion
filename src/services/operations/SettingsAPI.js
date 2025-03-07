import toast from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slice/ProfileSlice";
import { logout } from "./authAPI";

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating display picture...");
    try {
      const response = await apiConnector(
        "PUT",
        settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display picture updated successfully");
      dispatch(setUser(response.data.data));
    } catch (err) {
      console.log(err);
      toast.error("Failed to update display picture");
    }
    toast.dismiss(toastId);
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...");
    try {
      const response = await apiConnector(
        "PUT",
        settingsEndpoints.UPDATE_PROFILE_API,
        formData,
        { Authorization: `Bearer ${token}` }
      );
      if (response.status !== 200 || !response.data || !response.data.message) {
        throw new Error("Unexpected response from server");
      }
      const userImage = response.data.profileDetail.displayPicture
        ? response.data.profileDetail.displayPicture
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.profileDetail.firstName} ${response.data.profileDetail.lastName}`;
      dispatch(
        setUser({ ...response.data.profileDetail, displayPicture: userImage })
      );
      toast.success("Profile updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
    }
    toast.dismiss(toastId);
  };
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting account...");
    try {
      const response = await apiConnector(
        "DELETE",
        settingsEndpoints.DELETE_PROFILE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.status !== 200 || !response.data || !response.data.message) {
        throw new Error("Unexpected response from server");
      }
      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete account");
    }
    toast.dismiss(toastId);
  };
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Updating password...");
  try {
    const response = await apiConnector(
      "POST",
      settingsEndpoints.CHANGE_PASSWORD_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.status !== 200 || !response.data || !response.data.message) {
      throw new Error("Unexpected response from server");
    }
    toast.success("Password updated successfully");
  } catch (err) {
    console.log(err);
    toast.error("Failed to update password");
  }
  toast.dismiss(toastId);
}
