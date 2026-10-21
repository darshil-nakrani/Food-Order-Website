import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUser } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const [currState, setCurrSet] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        if (response.data.user) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // Different messages for login and register
        if (currState === "Login") {
          toast.success("Login Successful!", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.success("Account Created Successfully! 🎉", {
            position: "top-center",
            autoClose: 2000,
          });
        }

        setTimeout(() => setShowLogin(false), 2000); // Close popup after 2 seconds
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again!", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form
        onSubmit={onLogin}
        action=""
        className="login-popup-container"
        autoComplete="off"
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              autoComplete="off"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            autoComplete="off"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Your Password"
            autoComplete="off"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="btn-spinner-container">
              <div className="btn-spinner"></div>
              <span>Processing...</span>
            </div>
          ) : currState === "Sign Up" ? (
            "Create account"
          ) : (
            "Login"
          )}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the term of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrSet("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrSet("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
