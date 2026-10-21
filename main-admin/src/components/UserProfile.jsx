import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const adminName = localStorage.getItem("adminName") || "Smit";
  const adminEmail = localStorage.getItem("adminEmail") || "smit@shop.com";
  const adminRole = localStorage.getItem("adminRole") || "Administrator";

  const handleLogOut = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminRole");
    console.log("Logging out..."); 
    navigate("/login"); 
    window.location.reload(); 
  };

  return (
    <div className="nav-item absolute right-1 top-16 dark:bg-[#42464D] p-8 rounded-lg w-96" style={{background:"#ccc"}}>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6 justify-center flex-col md:flex-row">
        <div className="rounded-full h-24 w-24 flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-tr from-[#ff7b5f] to-[#ff4c24] border-4 border-white shadow-md">
          {adminName.charAt(0).toUpperCase()}
        </div>
        <div className="text-center md:text-left">
          <p className="font-semibold text-xl dark:text-gray-200"> {adminName} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {adminRole}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {adminEmail}
          </p>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <button className="btn btn-primary w-80 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 shadow-md"
          type="button"
          style={{
            background: currentColor || "linear-gradient(135deg, #ff4c24, #ff7b5f)",
          }}
          onClick={handleLogOut}
        >Log Out</button>
      </div>
    </div>
  );
};

export default UserProfile;
