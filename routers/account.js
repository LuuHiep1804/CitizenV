import express from 'express';
import { login, getUser, getAccessToken, logout, register, update, getRoleA2, getRoleLower } from '../controllers/account.js';
import { checkA1, checkA2, checkA3, checkB1, verifyToken } from '../middleware/auth.js';

const router = express.Router();


router.post('/login', login);

router.post('/token', getAccessToken);

router.post('/register', verifyToken, register);

router.get('/user', verifyToken, getUser);

router.get('/user/managerment-A2', verifyToken, checkA1, getRoleA2);

router.get('/user/managerment-A3', verifyToken, checkA2, getRoleLower);

router.get('/user/managerment-B1', verifyToken, checkA3, getRoleLower);

router.get('/user/managerment-B2', verifyToken, checkB1, getRoleLower);

router.delete('/logout', verifyToken, logout);

router.put('/update-A2/:_id', verifyToken, checkA1, update);

router.put('/update-A3/:_id', verifyToken, checkA2, update);

router.put('/update-B1/:_id', verifyToken, checkA3, update);

router.put('/update-B2/:_id', verifyToken, checkB1, update);

export default router;