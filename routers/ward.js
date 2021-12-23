import express from 'express';
import { createWard, getWard, getWardById, getWardsByDistrictId, updateWard } from '../controllers/ward.js';
import { checkA3, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getWard);

router.get('/:_id', getWardById);

router.get('/by-district/:_id', getWardsByDistrictId);

router.post('/', verifyToken, checkA3, createWard);

router.put('/:_id', verifyToken, checkA3, updateWard);

export default router;