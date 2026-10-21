import express from "express";
import { addContactMessage, listContactMessages, deleteContactMessage } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/add", addContactMessage);
contactRouter.get("/list", listContactMessages);
contactRouter.post("/delete", deleteContactMessage);

export default contactRouter;
