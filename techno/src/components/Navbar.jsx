import "./Navbar.css";

export default function Navbar({ showLogin, showSignup , goHome  }) {
  return (
    <div className="navbar">
           <h2 onClick={goHome} className="logo">User Portal</h2>
      <div>
        <button onClick={showLogin}>Login</button>
        <button onClick={showSignup}>Signup</button>
      </div>
    </div>
  );
}