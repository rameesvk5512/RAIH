import express from 'express'
import  userAuthController from '../controllers/user.auth.controller.js'

const router = express.Router();


router.post('/register', userAuthController.registerUser);
router.post('/login', userAuthController.login);
router.post('/logout', userAuthController.logout);

export default router
