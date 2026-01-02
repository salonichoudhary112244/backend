// // src/components/Register.jsx

// import React, { useState } from "react";
// import { registerUser } from "./services/authService";

// function Register() {
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//     username: "",
//     phone: ""
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await registerUser(user);
//     const result = await response.text();

//     alert(result);
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={user.email}
//           onChange={handleChange}
//           required
//         />

//         <br /><br />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={user.password}
//           onChange={handleChange}
//           required
//         />

//         <br /><br />

//         <input
//           type="text"
//           name="username"
//           placeholder="Username (optional)"
//           value={user.username}
//           onChange={handleChange}
//         />

//         <br /><br />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone (optional)"
//           value={user.phone}
//           onChange={handleChange}
//         />

//         <br /><br />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;
