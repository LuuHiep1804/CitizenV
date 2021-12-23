import express from 'express';
import { createDistrict, getDistrict, getDistrictById, getDistrictsByProvinceId, updateDistrict } from '../controllers/district.js';
import { checkA2, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getDistrict);

router.get('/:_id', getDistrictById);

router.get('/by-province/:_id', getDistrictsByProvinceId);

router.post('/', verifyToken, checkA2, createDistrict);

router.put('/:_id',verifyToken, checkA2, updateDistrict);

export default router;