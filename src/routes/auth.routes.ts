import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  return await registerUser(req, res);
});

//router.post("/login", loginUser);

router.post("/login", async (req: Request, res: Response) => {
  return await loginUser(req, res);
});

export default router;
