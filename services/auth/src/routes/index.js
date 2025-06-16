import express from 'express';
import userAuthRoutes from './user.auth.routes.js';

const router = express.Router();

router.use("/auth/user", userAuthRoutes);

export default router;
