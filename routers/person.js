import express from 'express';
import {addPerson, getPerson, getPersonById, getPersonByRGroupId, updatePerson} from '../controllers/person.js';

const router = express.Router();

router.get('/', getPerson);

router.get('/:_id', getPersonById);

router.get('/by-group/:_id', getPersonByRGroupId);

router.post('/', addPerson);

router.put('/:_id', updatePerson);

export default router;