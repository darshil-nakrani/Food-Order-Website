import express from "express";
import { loginAdmin, registerAdmin, approveAdmin, getPendingRegistrations, rejectAdmin } from "../controllers/adminController.js";
import isMainAdmin from "../middleware/isMainAdmin.js"; 

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/pending", getPendingRegistrations); 
adminRouter.post("/approve/:id", approveAdmin);
adminRouter.delete("/reject/:id", rejectAdmin);

export default adminRouter;
