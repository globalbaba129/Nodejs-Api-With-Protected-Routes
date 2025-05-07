import  errorHandler  from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import express from "express";
import userAuth from "./routes/userAuth.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";

// server.js

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use(errorHandler);

// ✅ Use the router
app.use('/user', userRoutes);
app.use('/api/userAuth', userAuth);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
