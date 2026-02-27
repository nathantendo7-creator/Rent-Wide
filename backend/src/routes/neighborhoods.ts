import { Router } from "express";
import { getNeighborhoods } from "../controllers/neighborhoodsController";
const router = Router();
router.get("/", getNeighborhoods);
export default router;
