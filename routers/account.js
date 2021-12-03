import express from 'express';
import { getToken, getUser } from '../controllers/account.js';

const router = express.Router();

router.post('/', getToken);

router.get('/:token', getUser);

export default router;