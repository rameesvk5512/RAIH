import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import { dbConnect } from './config/db.js';
import { initRabbitMQ } from './utils/rabbitMq.js';


dotenv.config();
const PORT =process.env.PORT
const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1', routes);


app.listen(PORT, async () => {
  await initRabbitMQ(); // connect once at startup
  console.log(`🚀 Auth Service running on http://localhost:${PORT}`);
});