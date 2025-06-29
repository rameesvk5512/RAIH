import express from 'express';
import userAuthRoutes from './user.auth.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "Auth Service Root Route ✅" });
});

router.use('/user', userAuthRoutes); // → /api/v1/user

export default router;
