import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { authenticateUser, AuthenticatedRequest } from "../middleware/auth";
import Note from "../models/note.model";

const router = Router();

// Get notes by category
router.get("/categories/:categoryId", async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const notes = await Note.find({ categoryId });
    res.json(notes);
    return;
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
    return;
  }
});

// Get all notes
router.get(
  "/",
  authenticateUser,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const notes = await Note.find({ userId: req.user?.userId });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get a specific note
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new note
router.post(
  "/",
  authenticateUser as RequestHandler,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        res.status(400).json({ message: "Title and content are required" });
        return;
      }

      const note = new Note({
        title,
        content,
        userId: req.user?.userId,
      });

      await note.save();
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Delete a note
router.delete(
  "/:id",
  authenticateUser as RequestHandler,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const note = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: req.user?.userId,
      });

      if (!note) {
        res.status(404).json({ message: "Note not found" });
      }

      res.json({ message: "Note deleted successfully" });
    } catch (error: any) {
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
  authenticateUser as RequestHandler,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { title, content, categoryId } = req.body;
      const note = await Note.findOne({
        _id: req.params.id,
        userId: req.user?.userId,
      });

      if (!note) {
        res.status(404).json({ message: "Note not found" });
        return;
      }

      // Update note fields only if new values are provided
      if (title) note.title = title;
      if (content) note.content = content;
      if (categoryId) note.categoryId = categoryId;

      await note.save();
      res.json(note);
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

export default router;
