import express from 'express';
import { createWard, getWard, getWardById, updateWard } from '../controllers/ward.js';

const router = express.Router();

router.get('/', getWard);

router.get('/:_id', getWardById);

router.post('/', createWard);

router.put('/:_id', updateWard);

export default router;