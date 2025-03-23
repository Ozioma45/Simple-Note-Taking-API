import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  console.log("JWT_SECRET is not defined in environment variables.");
}

// Register a New User
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user existence
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ message: "Server error" });
  }
};
