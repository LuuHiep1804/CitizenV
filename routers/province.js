import express from 'express';
import { createProvince, getAllProvince, getProvinceById, updateProvince } from '../controllers/province.js';

const router = express.Router();

router.get('/', getAllProvince);

router.get('/:_id', getProvinceById);

router.post('/', createProvince);

router.put('/:_id', updateProvince);

export default router;