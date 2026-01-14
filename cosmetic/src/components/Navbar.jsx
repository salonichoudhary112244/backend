import { Link ,useNavigate,NavLink} from "react-router-dom";
import {useState,useEffect} from "react";
import { MdSpa ,MdShoppingCart } from "react-icons/md";   // ✅ ADD THIS
import { getCartCountApi } from "../api/cartApi";
import "../styles/saloni.css";
import "../styles/navbar.css";


export default function Navbar() {
//helper cart 
const getStoredUser = () => {
  try {
    const data = localStorage.getItem("user");
    if (!data || data === "undefined") return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
};



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

//cart ke lite abhi add kiya
const loadCartCount = async () => {
//  const user = JSON.parse(localStorage.getItem("user"));
const user = getStoredUser();

  if (!user?.id) return;

  const res = await getCartCountApi(user.id);
  setCartCount(res.data);
};

useEffect(() => {
  loadCartCount();

  const onStorageChange = () => loadCartCount();
  window.addEventListener("storage", onStorageChange);

  return () => window.removeEventListener("storage", onStorageChange);
}, 

[]);


  /* 🔹 LOAD USER FROM LOCAL STORAGE */
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     // setUser(JSON.parse(storedUser));
  //   }
  // }, []);
//cart ke liye add
  useEffect(() => {
  const u = getStoredUser();
  if (u) setUser(u);
}, []);


  /* 🔹 LOGOUT */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;



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

{/* <div className="cart-icon" onClick={() => navigate("/cart")}>
  <MdShoppingCart size={22} />
  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
</div> */}

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
