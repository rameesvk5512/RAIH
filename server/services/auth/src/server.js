import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { dbConnect } from './config/db.js';
import { initRabbitMQ } from './utils/rabbitMq.js';

dotenv.config();
const PORT =  5001;

const app = express();

const router = express.Router();
app.use("/",router)

// DB connect
dbConnect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1', routes); // → handles /api/v1/user/* and /

app.listen(PORT, async () => {
  await initRabbitMQ();
  console.log(`🚀 Auth Service running on http://localhost:${PORT}`);
});

