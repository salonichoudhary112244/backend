// import React, { useState } from "react";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Navbar from "./components/Navbar";
// export default function App() {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div>
//         <Navbar
//         showLogin={() => setShowLogin(false)}
//         showSignup={() => setShowLogin(false)}
//       />
//       {showLogin ? (
//         <Login switchForm={() => setShowLogin(false)} />
//       ) : (
//         <Signup switchForm={() => setShowLogin(true)} />
        
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import "./App.css";
export default function App() {
  const [activeForm, setActiveForm] = useState("");

  return (
    <div>
      <Navbar
        goHome={() => setActiveForm("")}
        showLogin={() => setActiveForm("login")}
        showSignup={() => setActiveForm("signup")}
      />

      {/* {activeForm === "" && (
        <div className="home-page">
          <h1>Welcome to User Authentication System</h1>
          <p>Please choose Login or Signup from above menu</p>
        </div>
      )} */}

{activeForm === "" && (
  <div className="home-page">
    <div className="overlay">
      <div className="home-text">
        <h1>Welcome to User Authentication System</h1>
        <p>Secure login and signup experience for users</p>
      </div>
    </div>
  </div>
)}

      {activeForm === "login" && (
        <Login switchForm={() => setActiveForm("signup")} />
      )}

      {activeForm === "signup" && (
        <Signup switchForm={() => setActiveForm("login")} />
      )}
    </div>
  );
}