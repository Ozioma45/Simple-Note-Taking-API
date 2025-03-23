"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define Mongoose Schema
const categorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
});
// Create Mongoose Model
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
