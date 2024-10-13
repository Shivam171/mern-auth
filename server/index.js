import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware to allow parse incoming requests from req.body
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to DB and start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})