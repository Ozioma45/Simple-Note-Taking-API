import { Router, Request, Response } from "express";
import Category from "../models/category.model";

const router = Router();

// Get all categories
router.get("/", async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new category
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
