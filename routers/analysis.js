import express from "express";
import { getAnalysisInGroup } from "../controllers/analysis.js";

const router = express.Router();

router.get('/group/:_id', getAnalysisInGroup);

export default router;