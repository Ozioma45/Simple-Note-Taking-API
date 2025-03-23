import { Router, Request, Response } from "express";
import Note from "../models/note.model";
import { authenticateUser, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// Get notes by category
router.get("/categories/:categoryId", async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const notes = await Note.find({ categoryId });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Get all notes
router.get(
  "/",
  authenticateUser,
  async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const notes = await Note.find({ userId: _req.user?.userId });
      res.json(notes);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

// Get a specific note
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Create a new note
router.post(
  "/",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, content, categoryId } = req.body;
      if (!title || !content || !categoryId)
        return res
          .status(400)
          .json({ message: "Title, content, and categoryId are required" });

      const note = new Note({
        title,
        content,
        categoryId,
        userId: req.user?.userId,
      });
      await note.save();
      res.status(201).json(note);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

// Delete a note
router.delete(
  "/:id",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const note = await Note.findByIdAndDelete({
        _id: req.params.id,
        userId: req.user?.userId,
      });
      if (!note) return res.status(404).json({ message: "Note not found" });
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

// Update a note
router.put(
  "/:id",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, content, categoryId } = req.body;
      const note = await Note.findById({
        _id: req.params.id,
        userId: req.user?.userId,
      });
      if (!note) return res.status(404).json({ message: "Note not found" });

      note.title = title || note.title;
      note.content = content || note.content;
      note.categoryId = categoryId || note.categoryId;

      await note.save();
      res.json(note);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

export default router;
