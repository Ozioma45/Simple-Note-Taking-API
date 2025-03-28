"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const express_1 = require("express");
const category_model_1 = __importDefault(require("../models/category.model"));
const router = (0, express_1.Router)();
// Get all categories
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.default.find();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCategories = getCategories;
router.get("/", exports.getCategories);
// Create a new category
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ message: "Category name is required" });
            return;
        }
        // Check if the category already exists
        const existingCategory = yield category_model_1.default.findOne({ name });
        if (existingCategory) {
            res.status(400).json({ message: "Category already exists" });
            return;
        }
        const category = new category_model_1.default({ name });
        yield category.save();
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createCategory = createCategory;
router.post("/", exports.createCategory);
exports.default = router;
