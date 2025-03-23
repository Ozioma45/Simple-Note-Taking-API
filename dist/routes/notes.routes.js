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
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const note_model_1 = __importDefault(require("../models/note.model"));
const router = (0, express_1.Router)();
// Get notes by category
router.get("/categories/:categoryId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        const notes = yield note_model_1.default.find({ categoryId });
        res.json(notes);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
// Get all notes
router.get("/", auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const notes = yield note_model_1.default.find({ userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Get a specific note
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_model_1.default.findById(req.params.id);
        if (!note) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.json(note);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Create a new note
router.post("/", auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({ message: "Title and content are required" });
            return;
        }
        const note = new note_model_1.default({
            title,
            content,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId, // Assign note to the authenticated user
        });
        yield note.save();
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Delete a note
router.delete("/:id", auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const note = yield note_model_1.default.findByIdAndDelete({
            _id: req.params.id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
        });
        if (!note)
            return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
// Update a note
router.put("/:id", auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content, categoryId } = req.body;
        const note = yield note_model_1.default.findById({
            _id: req.params.id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
        });
        if (!note)
            return res.status(404).json({ message: "Note not found" });
        note.title = title || note.title;
        note.content = content || note.content;
        note.categoryId = categoryId || note.categoryId;
        yield note.save();
        res.json(note);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
exports.default = router;
