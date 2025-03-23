import { Router, Request, Response, RequestHandler } from "express";
import Category from "../models/category.model";

const router = Router();

// Get all categories
export const getCategories: RequestHandler = async (_req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

router.get("/", getCategories);

// Create a new category
export const createCategory: RequestHandler = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return;
    }

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(400).json({ message: "Category already exists" });
      return;
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

router.post("/", createCategory);

export default router;
