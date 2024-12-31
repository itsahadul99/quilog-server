import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './routes/userRoutes';
import errorHandler from './middleWare/errorHandling';
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: ['http://localhost:5173',],
  credentials: true,
  optionSuccessStatus: 200,
}
// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// User routes
app.use('/', router)

// Error handler middleware
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Quilog Server!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Quilog Server is running on port ${PORT}`);
});
