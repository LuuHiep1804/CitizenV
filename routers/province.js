import express from 'express';
import { createProvince, getAllProvince, getProvinceById, updateProvince } from '../controllers/province.js';
import { checkA1, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProvince);

router.get('/:_id', getProvinceById);

router.post('/', verifyToken, checkA1, createProvince);

router.put('/:_id', verifyToken, checkA1, updateProvince);

export default router;