import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [sticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { getTotalCartAmount, token, setToken, search, setSearch, setShowCart } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMenu("home");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Sticky Navbar Logic
  React.useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
    setTimeout(() => navigate("/"), 1000);
    navigate("/");
  };

  return (
    <div className={`navbar-outer ${sticky ? "sticky" : ""}`}>
      <div className="navbar">
        <div className="navbar-left">
          <div className="hamburger" onClick={toggleMobileMenu}>
            <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
            <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
            <div className={`line ${isMobileMenuOpen ? "open" : ""}`}></div>
          </div>
          <Link to="/" onClick={scrollToTop}>
            <img src={assets.logo} alt="" className="logo" />
          </Link>
        </div>
        
        <ul className={`navbar-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <Link
            to="/"
            onClick={scrollToTop}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => {setMenu("menu"); setIsMobileMenuOpen(false);}}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => {setMenu("mobile-app"); setIsMobileMenuOpen(false);}}
            className={menu === "mobile-app" ? "active" : ""}
          >
            Mobile-app
          </a>
          <Link
            to="/contact"
            onClick={() => {setMenu("contact-us"); setIsMobileMenuOpen(false);}}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact us
          </Link>
        </ul>
        <div className="navbar-right">
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <img src={assets.search_icon} alt="" className="search-icon-inside" />
          </div>
          <div className="navbar-search-icon" onClick={() => setShowCart(true)}>
            <img src={assets.basket_icon} alt="" style={{cursor: 'pointer'}} />
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate("/profile")}>
                  <img src={assets.profile_icon} alt="" />
                  <p>Profile</p>
                </li>
                <hr />
                <li onClick={() => navigate("/myorders")}>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
