import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import catRouter from './routes/catRouter.js';
import connectDB from './config/DB.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

await connectDB ();

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/api/user",userRouter)
app.use("/api/cat",catRouter)






app.listen(PORT, () => {
  console.log(`Server running on port +${PORT}`);
});
