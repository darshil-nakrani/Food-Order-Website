import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const { user, setUser, url, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Redirect to home if not logged in
  useEffect(() => {
    if (!token && !localStorage.getItem("token")) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""];
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    if (user) {
      const nameParts = user.name ? user.name.split(" ") : ["", ""];
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
      });
    }
    setIsEditing(false);
  };

  const saveProfile = async () => {
    if (!formData.firstName.trim()) {
      toast.error("First Name cannot be empty");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }

    try {
      const fullName = formData.lastName.trim() 
        ? `${formData.firstName.trim()} ${formData.lastName.trim()}`
        : formData.firstName.trim();

      const response = await axios.put(
        `${url}/api/user/update`,
        { name: fullName, email: formData.email.trim() },
        { headers: { token } }
      );

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Banner with brand accent */}
        <div className="profile-banner">
          <div className="profile-banner-overlay"></div>
        </div>

        <div className="profile-content-layout">
          {/* Left Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-badge">
                {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : "?"}
              </div>
            </div>
            
            <h3 className="profile-sidebar-name">{user?.name || "User Name"}</h3>
            <p className="profile-sidebar-email">{user?.email || "user@email.com"}</p>

            <nav className="profile-sidebar-nav">
              <button className="sidebar-nav-btn active">
                <span className="nav-icon">👤</span> Profile Details
              </button>
              <button className="sidebar-nav-btn" onClick={() => navigate("/myorders")}>
                <span className="nav-icon">📦</span> My Orders
              </button>
              <button className="sidebar-nav-btn logout-btn" onClick={handleLogout}>
                <span className="nav-icon">🚪</span> Logout
              </button>
            </nav>
          </aside>

          {/* Right Main Content */}
          <main className="profile-main-content">
            <div className="profile-section-header">
              <h2>Account Settings</h2>
              <p>Update your profile information and manage your account details.</p>
            </div>

            <div className="profile-fields-grid">
              <div className="profile-field-group">
                <label className="field-label">First Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="First Name"
                    className={`profile-input ${isEditing ? "editable" : "readonly"}`}
                  />
                  <span className="input-focus-line"></span>
                </div>
              </div>

              <div className="profile-field-group">
                <label className="field-label">Last Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Last Name"
                    className={`profile-input ${isEditing ? "editable" : "readonly"}`}
                  />
                  <span className="input-focus-line"></span>
                </div>
              </div>

              <div className="profile-field-group full-width">
                <label className="field-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Email Address"
                    className={`profile-input ${isEditing ? "editable" : "readonly"}`}
                  />
                  <span className="input-focus-line"></span>
                </div>
              </div>
            </div>

            <div className="profile-actions-wrapper">
              {isEditing ? (
                <div className="profile-action-buttons">
                  <button className="profile-btn save-btn" onClick={saveProfile}>
                    Save Changes
                  </button>
                  <button className="profile-btn cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="profile-btn edit-btn" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;

