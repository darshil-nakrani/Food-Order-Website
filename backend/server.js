import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
// import createMainAdmin from "./scripts/createMainAdmin.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoutes.js";
import contactRouter from "./routes/contactRoute.js";
import dotenv from "dotenv";

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db Connection
connectDB();
// createMainAdmin();

// api endpoint
app.use("/api/food", foodRouter);
// app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});


