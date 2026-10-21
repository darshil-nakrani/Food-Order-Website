import React from "react";
import "./About.css";
import { assets } from "../../assets/assets";

const About = () => {
  return (
    <div className="about-container my-5 animate__animated animate__fadeIn">
      {/* Banner Section */}
      <div className="about-banner text-center d-flex flex-column justify-content-center align-items-center">
        <h1 className="about-banner-title">About Us</h1>
        <p className="about-banner-subtitle">
          Bringing delicious, healthy, and premium meals straight to your door.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="about-content d-flex flex-column gap-5 mt-5">
        
        {/* Story Section */}
        <div className="about-section row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2 className="section-title">Our Story</h2>
            <p className="section-description mt-3">
              Founded in 2026, <strong>Tomato</strong> started with a simple yet powerful mission: to connect food lovers with their favorite meals from local chefs and restaurants, delivered with unmatched convenience and fresh taste.
            </p>
            <p className="section-description">
              What began as a small university passion project has now grown into a premium food delivery platform serving thousands of satisfied customers every day. We believe food isn’t just about fuel—it's about culture, joy, and creating unforgettable moments.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <div className="about-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop"
                alt="Delicious food background"
                className="img-fluid rounded-4 shadow"
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="about-stats-grid d-flex flex-wrap justify-content-around gap-4 text-center py-4 rounded-4 my-4">
          <div className="stat-card p-3">
            <h3>10K+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-card p-3">
            <h3>150+</h3>
            <p>Restaurant Partners</p>
          </div>
          <div className="stat-card p-3">
            <h3>30 Mins</h3>
            <p>Average Delivery Time</p>
          </div>
          <div className="stat-card p-3">
            <h3>4.9 ★</h3>
            <p>Customer Rating</p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="about-values">
          <h2 className="section-title text-center mb-5">Our Core Values</h2>
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="value-card h-100 p-4 text-center rounded-4 shadow-sm border-0">
                <div className="value-icon mb-3">🥗</div>
                <h4 className="value-title mb-2">Uncompromised Quality</h4>
                <p className="value-text text-muted">
                  We partner only with verified kitchens that share our uncompromising standards for fresh, wholesome, and premium ingredients.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-md-4">
              <div className="value-card h-100 p-4 text-center rounded-4 shadow-sm border-0">
                <div className="value-icon mb-3">🚀</div>
                <h4 className="value-title mb-2">Lightning-Fast Delivery</h4>
                <p className="value-text text-muted">
                  Our advanced routing system ensures your meals arrive hot, fresh, and on schedule every single time.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-md-4">
              <div className="value-card h-100 p-4 text-center rounded-4 shadow-sm border-0">
                <div className="value-icon mb-3">❤️</div>
                <h4 className="value-title mb-2">Customer First</h4>
                <p className="value-text text-muted">
                  Your absolute satisfaction is our obsession. We provide round-the-clock support to guarantee an exceptional dining experience.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
