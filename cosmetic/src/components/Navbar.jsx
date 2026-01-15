import { Link ,useNavigate,NavLink} from "react-router-dom";
import {useState,useEffect} from "react";
import { MdSpa ,MdShoppingCart } from "react-icons/md";   // ✅ ADD THIS
import { getCartCountApi } from "../api/cartApi";
import { getStoredUser } from "../utils/auth";
import "../styles/saloni.css";
import "../styles/navbar.css";
export default function Navbar() {



  //  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

// useEffect(() => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user?.id) return;

//   getCartCountApi(user.id).then(res => {
//     setCartCount(res.data);
//   });
// }, []);


//isko abhi check krne ke liye band kiya h iski jagah neche bala h
// useEffect(() => {
//   const load = async () => {
//     try {
//       const res = await getCartCountApi();
//       setCartCount(res.data);
//     } catch {}
//   };

//   load();
//   window.addEventListener("storage", load);
//   return () => window.removeEventListener("storage", load);
// }, []);



//   /* 🔹 LOAD USER FROM LOCAL STORAGE */
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       // setUser(JSON.parse(storedUser));
//     }
//   }, []);
//   /* 🔹 LOGOUT */
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   const navClass = ({ isActive }) =>
//     `nav-link ${isActive ? "active" : ""}`;


useEffect(() => {
  const user = getStoredUser();
  if (!user?.id) return;

  const loadCartCount = async () => {
    try {
      const res = await getCartCountApi(user.id);
      setCartCount(res.data);
    } catch (e) {
      console.error("Cart count error", e);
    }
  };

  loadCartCount();

  window.addEventListener("cartUpdated", loadCartCount);
  return () => window.removeEventListener("cartUpdated", loadCartCount);
}, []);



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

        <div className="seller-search">
        <input placeholder="Search " />
      </div>
      
      {/* cart */}

<div
  className="cart-icon"
  onClick={() => navigate("/cart")}
>
  <MdShoppingCart size={22} />
  {cartCount > 0 && (
    <span className="cart-badge">{cartCount}</span>
  )}
</div>



 {/* RIGHT LINKS */}
        <div className="nav-right d-none d-md-flex">

          {user ? (
            <>
              <span className="user-name">
                Hi, {user.name}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="signin-btn">Login</NavLink>
              <NavLink to="/register" className="register-btn">Register</NavLink>
            </>
          )}

          {/* CART ICON */}
          {/* <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton> */}
        </div>

      {/* AUTH
      <div className="auth-buttons">
        <Link to="/login" className="signin-btn">Sign in</Link>
        <Link to="/register" className="register-btn">Register</Link>
      </div> */}
    </nav>
  );
}
