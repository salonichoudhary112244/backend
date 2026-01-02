import axios from "axios";

/* ==============================
   AXIOS INSTANCE
================================ */
const API = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ==============================
   AUTH APIs
================================ */

// 🔐 LOGIN
export const login = (data) => {
  return API.post("/login", data);
};

// 📝 REGISTER
export const register = (data) => {
  return API.post("/register", data);
};

// 📧 VERIFY EMAIL OTP
export const verifyEmailOtp = (email, otp) => {
  return API.post("/verify-email-otp", null, {
    params: {
      email,
      otp,
    },
  });
};

// 📱 VERIFY PHONE OTP
export const verifyPhoneOtp = (phone, otp) => {
  return API.post("/verify-phone-otp", null, {
    params: {
      phone,
      otp,
    },
  });
};

// 🔁 FORGOT PASSWORD (SEND MAIL)
export const forgotPassword = (email) => {
  return API.post("/forgot-password", {
    email,
  });
};

// 🔑 RESET PASSWORD
export const resetPassword = (token, newPassword) => {
  return API.post("/reset-password", null, {
    params: {
      token,
      newPassword,
    },
  });
};

// 🔵 GOOGLE LOGIN
export const googleLogin = (idtoken) => {
  return API.post("/google", {
    idtoken,
  });
};
