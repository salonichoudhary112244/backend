// // src/components/Login.jsx

// import React, { useState } from "react";
// import { loginUser } from "./services/authService";

// function Login() {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await loginUser(loginData);
//     const token = await response.text();

//     // JWT token store
//     localStorage.setItem("token", token);

//     alert("Login successful");
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={loginData.email}
//           onChange={handleChange}
//           required
//         />

//         <br /><br />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={loginData.password}
//           onChange={handleChange}
//           required
//         />

//         <br /><br />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
