import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Header } from '../../components';
import './Inquiries.css';

const Inquiries = ({ url }) => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (isMounted) => {
    try {
      const response = await axios.get(`${url}/api/contact/list`);
      if (response.data.success) {
        if (isMounted) {
          setMessages(response.data.data);
        }
      } else {
        toast.error("Error fetching inquiries");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error");
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await axios.post(`${url}/api/contact/delete`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchMessages(true);
      } else {
        toast.error("Error deleting inquiry");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting inquiry");
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchMessages(isMounted);
    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customer Inquiries" />
      <div className="list flex-col">
        <div className="list-table">
          <div className="list-table-format-inquiry title">
            <b>Date</b>
            <b>Name</b>
            <b>Email</b>
            <b>Subject</b>
            <b>Message</b>
            <b>Action</b>
          </div>
          {messages.map((item, index) => (
            <div key={index} className="list-table-format-inquiry">
              <p>{new Date(item.date).toLocaleDateString()}</p>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.subject}</p>
              <p className="message-content" title={item.message}>{item.message}</p>
              <p onClick={() => deleteMessage(item._id)} className="btn btn-danger btn-sm cursor text-center" style={{ width: "50px", margin: "0 auto" }}>
                X
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
