import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errorHandler";

// Generic Validator Function
export const validateRequest =
  <T>(schema: (data: any) => T) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema(req.body); // Validate and cast request body
      next();
    } catch (error: Error) {
      next(new CustomError("Invalid request format", 400));
    }
  };
