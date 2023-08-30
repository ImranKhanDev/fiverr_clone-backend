import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/user.route.js";
import orderRoute from "./routes/user.route.js";
import conversationRoute from "./routes/user.route.js";
import messageRoute from "./routes/user.route.js";
import reviewRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

//* middleware
app.use(express.json())
app.use(cookieParser())
//*connecting mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB");
  } catch (error) {
    handleError(error);
  }
};

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/message", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMsg)
})
app.listen(8080, () => {
  connect();
  console.log("backend server is running");
})


