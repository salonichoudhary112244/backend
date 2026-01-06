import { Link } from "react-router-dom";
import { MdSpa } from "react-icons/md";   // ✅ ADD THIS
import "../styles/saloni.css";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="saloni-navbar">
      {/* BRAND */}
      <div className="brand">
        <Link to="/" className="brand-link">
          <MdSpa className="saloni-icon hair-flow" />
          <span className="brand-name">SALONI</span>
        </Link>
        <span className="tagline">Crafted Beauty</span>
      </div>

      {/* MENU */}
      <ul className="nav-menu">
         <li>
    <Link to="/products" className="nav-link">Shop</Link>
  </li>
        <li>Skincare</li>
        <li>Hair Care</li>
        <li>Makeup</li>
      </ul>

      {/* AUTH */}
      <div className="auth-buttons">
        <Link to="/login" className="signin-btn">Sign in</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div>
    </nav>
  );
}
