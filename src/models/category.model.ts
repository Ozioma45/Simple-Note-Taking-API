import mongoose from "mongoose";

// Define TypeScript Interface for Categories
export interface ICategory {
  name: string;
}

// Define Mongoose Schema
const categorySchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true },
});

// Create Mongoose Model
const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
