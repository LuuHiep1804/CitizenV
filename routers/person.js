import express from 'express';
import {addPerson, getPersonByDistrictId, getPersonById, getPersonByProvinceId, getPersonByRGroupId, getPersonByWardId, updatePerson} from '../controllers/person.js';

const router = express.Router();

router.get('/:_id', getPersonById);

router.get('/by-group/:_id', getPersonByRGroupId);

router.get('/by-ward/:_id', getPersonByWardId);

router.get('/by-district/:_id', getPersonByDistrictId);

router.get('/by-province/:_id', getPersonByProvinceId);

router.post('/', addPerson);

router.put('/:_id', updatePerson);

export default router;