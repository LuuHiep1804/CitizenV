import express from 'express';
import { createRgroup, getRgroup, getRgroupById, getRgroupsByWardId, updateRgroup } from '../controllers/Rgroup.js';
import { checkB1, verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getRgroup);

router.get('/:_id', getRgroupById);

router.get('/by-ward/:_id', getRgroupsByWardId);

router.post('/', verifyToken, checkB1, createRgroup);

router.put('/:_id', verifyToken, checkB1, updateRgroup);

export default router;