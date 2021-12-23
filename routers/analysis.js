import express from "express";
import { analysisByCountry, analysisByGroup, analysisByLocal, getData } from "../controllers/analysis.js";
import { checkA1, checkB1, verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/data/:_id', getData);

router.put('/by-local/:_id', verifyToken, checkB1, analysisByLocal);

router.put('/by-group/:_id', verifyToken, analysisByGroup);

router.put('/by-country/:_id',verifyToken, checkA1, analysisByCountry);

export default router;