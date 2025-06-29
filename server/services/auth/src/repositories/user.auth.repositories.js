import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/Error.js';
const JWT_SECRET=process.env.JWT_SECRET
const userAuthRepo = {

 register : async (data) => {
  try {
    console.log("email",data);
    
    const existingUser = await User.findOne({ email: data.email });
     if (existingUser) {
    throw new AppError('Email already registered', 400);
  }


    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log("hhhhashed",hashedPassword);
    
    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      isVerified: false,
    });

   
   

    return {
      status: true,
      message: 'Registration successful. Verification email sent via queue.',
    };
  } catch (error) {
    console.error('Register error:', error);
    throw new Error(error.message || 'Registration failed');
  }
}
 
,

login: async (credentials) => {
  try {
    console.log("cccccccred ",credentials);
    
    const existingUser = await User.findOne({ email: credentials.email });
console.log("cccccccc",credentials.password,"existing",existingUser);

    if (!existingUser) {
      return { status: false, message: 'User not found' };
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, existingUser.password);
    if (!isPasswordValid) {
      return { status: false, message: 'Invalid credentials' };
    }


    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role || 'user',
    };

 
   // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    return {
      status: true,
      message: 'Login successful'
      }
    
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'An unexpected error occurred during login');
  }
}
,

  logout: async (token) => {
    try {
      return { status: true };
    } catch (err) {
      throw new Error(err.message || 'Logout failed');
    }
  },


};

export default userAuthRepo;
