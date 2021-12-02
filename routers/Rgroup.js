import express from 'express';
import { createRgroup, getRgroup, getRgroupById, getRgroupsByWardId, updateRgroup } from '../controllers/Rgroup.js';

const router = express.Router();

router.get('/', getRgroup);

router.get('/:_id', getRgroupById);

router.get('/by-ward/:_id', getRgroupsByWardId);

router.post('/', createRgroup);

router.put('/:_id', updateRgroup);

export default router;