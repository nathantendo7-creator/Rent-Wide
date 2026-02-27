import { Router } from "express";
import { runSeed } from "../controllers/seedController";
const router = Router();
router.post("/", runSeed);
export default router;
