import "../styles/auth.css";


import { useEffect } from "react";
import { googleLogin } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton(){
    const navigate = useNavigate();
//   const handleGoogleResponse = async (response) => {
//     try {
//       const idToken = response.credential;
//       const res = await googleLogin(idToken);

//       localStorage.setItem("token", res.data);
// //add
//        localStorage.setItem(
//       "user",
//       JSON.stringify({
//         id: res.data.id,
//         name: res.data.name,
//         email: res.data.email
//       })
//     );
//       navigate("/products");
//       setPopup({ msg: "Google login successful ✨", type: "success" });
//     }
    
    
//     catch {
//       setPopup({ msg: "Google login failed ❌", type: "error" });
//     }
//   };


  const handleGoogleResponse = async (response) => {
    try {
      const idToken = response.credential;

      const res = await googleLogin(idToken);

          console.log("GOOGLE LOGIN RESPONSE:", res.data);

    const userData = res.data;

      localStorage.setItem("token", userData.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          // id: res.data.id,
          // name: res.data.name,
          // email: res.data.email,
          
        //   id: res.data.user.id,
        // name: res.data.user.name,
        // email: res.data.user.email,
        // roles: res.data.user.roles   // 👈 MUST HAVE
       
          id: userData.id,
        name: userData.name,
        email: userData.email,
        roles: userData.roles || []
      })
      );

      alert("Google login successful ✅");
      navigate("/products");
    } catch (err) {
      console.error(err);
      alert("Google login failed ❌");
    }
  };

  useEffect(() => {
      console.log("Google object:", window.google);

    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "628025068852-cjernvki3n4jb7v52fdagb4m1jdrrv4d.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large", width: 300 }
      );
    }
  }, []);

    return (
    <div
      id="google-login-btn"
      style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}
    ></div>
  );
}