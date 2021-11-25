import express from 'express';
import { createDistrict, getDistrict, getDistrictById, updateDistrict } from '../controllers/district.js';

const router = express.Router();

router.get('/', getDistrict);

router.get('/:_id', getDistrictById);

router.post('/', createDistrict);

router.put('/:_id', updateDistrict);

export default router;