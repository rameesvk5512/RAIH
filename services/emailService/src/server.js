import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { startEmailConsumer } from './utils/rabitMqCunsumer.js';


dotenv.config();

const app = express();

startEmailConsumer()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
