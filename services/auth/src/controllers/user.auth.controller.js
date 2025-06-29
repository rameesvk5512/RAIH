
import UserAuthRepo from "../repositories/user.auth.repositories.js"
import { publishToEmailQueue } from "../utils/rabbitMq.js";
const UserAuthController = {
    registerUser: async (req, res) => {
    try {
      console.log("req",req.body);
      
      const data = await UserAuthRepo.register(req.body);

      console.log("senddding to rabil mq");
      const email =req.body.email
  await publishToEmailQueue({
  to: email,
  subject: "Welcome to RAIH!",
  template: "welcome", 
  //context: { name }, 
});

      return res.status(200).json({
        success: true,
        message: 'registration completed successfully',
        data,
      });
    } catch (err) {
      console.error('Login Error:', err.message);

      return res.status(err.statusCode || 422).json({
        success: false,
        message: err.message || 'Something went wrong during login',
      });
    }
  },
  login: async (req, res) => {
    try {
      const data = await UserAuthRepo.login(req.body);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data,
      });
    } catch (err) {
      console.error('Login Error:', err.message);

      return res.status(err.statusCode || 422).json({
        success: false,
        message: err.message || 'Something went wrong during login',
      });
    }
  },

  logout: async (req, res) => {
    try {
      const data = await UserAuthRepo.logout();

      return res.status(200).json({
        success: true,
        message: 'Logged out successfully',
        data,
      });
    } catch (err) {
      console.error('Logout Error:', err.message);

      return res.status(err.statusCode || 422).json({
        success: false,
        message: err.message || 'Logout failed',
      });
    }
  },
};

export default UserAuthController;
