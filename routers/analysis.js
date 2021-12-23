import express from "express";
import { analysisByCountry, analysisByGroup, analysisByLocal, getData } from "../controllers/analysis.js";

const router = express.Router();

router.get('/data/:_id', getData);

router.put('/by-local/:_id', analysisByLocal);

router.put('/by-group/:_id', analysisByGroup);

router.put('/by-country/:_id', analysisByCountry);

export default router;