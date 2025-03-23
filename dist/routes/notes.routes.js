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
const note_model_1 = __importDefault(require("../models/note.model"));
const auth_1 = require("../middleware/auth");
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
router.get("/", auth_1.authenticateUser, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const notes = yield note_model_1.default.find({ userId: (_a = _req.user) === null || _a === void 0 ? void 0 : _a.userId });
        res.json(notes);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
// Get a specific note
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_model_1.default.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: "Note not found" });
        res.json(note);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
// Create a new note
router.post("/", auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { title, content, categoryId } = req.body;
        if (!title || !content || !categoryId)
            return res
                .status(400)
                .json({ message: "Title, content, and categoryId are required" });
        const note = new note_model_1.default({
            title,
            content,
            categoryId,
            userId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId,
        });
        yield note.save();
        res.status(201).json(note);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}));
// Delete a note
router.delete("/:id", auth_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const note = yield note_model_1.default.findByIdAndDelete({
            _id: req.params.id,
            userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId,
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
    var _d;
    try {
        const { title, content, categoryId } = req.body;
        const note = yield note_model_1.default.findById({
            _id: req.params.id,
            userId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId,
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
