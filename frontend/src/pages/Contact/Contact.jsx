import React, { useState, useContext } from 'react';
import './Contact.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const { url } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/contact/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get in Touch</h1>
        <p>Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <div className="info-text">
              <h3>Our Location</h3>
              <p>123 Foodie Street, Gourmet City, India</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">📞</div>
            <div className="info-text">
              <h3>Phone Number</h3>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">📧</div>
            <div className="info-text">
              <h3>Email Address</h3>
              <p>support@tomato.com</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
