import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

// Authenticated Request Type
export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

// Authentication Middleware
export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
