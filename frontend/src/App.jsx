import React, { useState, useEffect } from "react";
import Navbar from "./componentes/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./componentes/Footer/Footer";
import LoginPopup from "./componentes/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import FoodDisplay from "./componentes/FoodDisplay/FoodDisplay";
import ExploreMenu from "./componentes/Navbar/ExploreMenu/ExploreMenu";
import OrderTrackingPage from "./pages/MyOrders/Track";
import CustomCursor from "./componentes/Cursor/CustomCursor.jsx";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile/Profile.jsx";
import CartDrawer from "./componentes/CartDrawer/CartDrawer";
import Loader from "./componentes/Loader/Loader";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Privacy from "./pages/Privacy/Privacy";

const App = () => {
  const [showlogin, setShowLogin] = useState(false);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time for branding
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <ToastContainer position="top-center" autoClose={2000} />
      <CartDrawer />

      {showlogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <CustomCursor />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/exploremenu"
            element={
              <ExploreMenu category={category} setCategory={setCategory} />
            }
          />
          <Route
            path="/foodmenu"
            element={<FoodDisplay category={category} />}
          />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/track" element={<OrderTrackingPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
