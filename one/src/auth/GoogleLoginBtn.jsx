import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GoogleLoginBtn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={async (res) => {
        const jwt = await api.post("/auth/google", {
          idtoken: res.credential,
        });
        login(jwt.data);
        navigate("/dashboard");
      }}
      onError={() => alert("Google Login Failed")}
    />
  );
};

export default GoogleLoginBtn;
