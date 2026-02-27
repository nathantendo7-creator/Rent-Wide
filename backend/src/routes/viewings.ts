import { Router } from "express";
import { createViewing } from "../controllers/viewingsController";
const router = Router();
router.post("/", createViewing);
export default router;
