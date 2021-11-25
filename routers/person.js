import express from 'express';
import {addPerson, getPerson, getPersonById, updatePerson} from '../controllers/person.js';

const router = express.Router();

router.get('/', getPerson);

router.get('/:_id', getPersonById);

router.post('/', addPerson);

router.put('/:_id', updatePerson);

export default router;