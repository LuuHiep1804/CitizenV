import express from 'express';
import { createWard, getWard, getWardById, getWardsByDistrictId, updateWard } from '../controllers/ward.js';

const router = express.Router();

router.get('/', getWard);

router.get('/:_id', getWardById);

router.get('/wards-by-district/:_id', getWardsByDistrictId);

router.post('/', createWard);

router.put('/:_id', updateWard);

export default router;