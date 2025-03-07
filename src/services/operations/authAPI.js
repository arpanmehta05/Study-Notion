import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slice/authSlice";
import { apiConnector } from "../ApiConnector";
import { contactUs, endpoints } from "../apis";
import { setUser } from "../../slice/ProfileSlice";

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", endpoints.LOGIN_API, {
        email,
        password,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(
        setUser({
          ...response.data.user,
          image: userImage,
        })
      );
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (err) {
      console.log(err);
      toast.error("Login failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", endpoints.SENDOTP, {
        email,
        checkUser: true,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP sent successfully");
      navigate("/verify-email");
    } catch (err) {
      console.log(err);
      toast.error("OTP failed to send");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const signup = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  otp,
  confirmPassword,
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", endpoints.SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        otp,
        confirmPassword,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Signup failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
};

export const getPasswordResetToken = (email, setEmailSent) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        endpoints.RESET_PASSWORD_TOKEN,
        { email }
      );
      console.log("RESET PASSWORD TOKEN RESPONSE....", response);
      if (response.status !== 200 || !response.data || !response.data.message) {
        throw new Error("Unexpected response from server");
      }
      toast.success("Password reset token sent successfully");
      setEmailSent(true);
    } catch (err) {
      console.log(err);
      toast.error("Failed to send password reset token");
    }
    dispatch(setLoading(false));
  };
};

export const resetPassword = (password, confirmPassword, token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", endpoints.RESET_PASSWORD, {
        password,
        confirmPassword,
        token,
      });
      if (response.status !== 200 || !response.data || !response.data.message) {
        throw new Error("Unexpected response from server");
      }
      toast.success("Password reset successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to reset password");
    }
    dispatch(setLoading(false));
  };
};
