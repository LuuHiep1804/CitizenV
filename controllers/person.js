import { DistrictModel } from "../models/DistrictModel.js";
import { PersonModel } from "../models/PersonModel.js";
import { ProvinceModel } from "../models/ProvinceModel.js";
import { RGroupModel } from "../models/RGroupModel.js";
import { WardModel } from "../models/WardModel.js";

export const getPerson = async (req, res) => {
    try {
        let allPerson 
        = await PersonModel.find()
        .populate({
            path: 'residential_group_id',
            populate: {
                path: 'ward_id',
                populate: {
                    path: 'district_id',
                    populate: {path: 'province_id'}
                }
            }
        });
        allPerson = allPerson.map(person => {
            const Rgroup = person.residential_group_id;
            const ward = Rgroup.ward_id;
            const district = ward.district_id;
            const province = district.province_id;
            return {
                _id: person._id,
                name: person.name,
                gender: person.gender,
                date_of_birth: person.date_of_birth,
                religion: person.religion,
                place_of_residence: person.place_of_residence,
                academic_level: person.academic_level,
                career: person.career,
                residential_group: Rgroup.name,
                ward: ward.name,
                district: district.name,
                province: province.name
            };
        });
        res.status(200).json(allPerson);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getPersonById = async (req, res) => {
    try {
        const _id = req.params._id;
        const result = await PersonModel.findById(_id)
        .populate({
            path: 'residential_group_id',
            populate: {
                path: 'ward_id',
                populate: {
                    path: 'district_id',
                    populate: {path: 'province_id'}
                }
            }
        });
        const Rgroup = result.residential_group_id;
        const ward = Rgroup.ward_id;
        const district = ward.district_id;
        const province = district.province_id;
        const person = {
            _id: result._id,
            name: result.name,
            gender: result.gender,
            date_of_birth: result.date_of_birth,
            religion: result.religion,
            place_of_residence: result.place_of_residence,
            academic_level: result.academic_level,
            career: result.career,
            residential_group: Rgroup.name,
            ward: ward.name,
            district: district.name,
            province: province.name
        };
        res.status(200).json(person);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const addPerson = async (req, res) => {
    try {
        const infoPerson = req.body;
        const checkPerson = await PersonModel.findById(infoPerson._id);
        if (checkPerson) {
            res.status(200).json('person is available!');
        }else {
            const newPerson = {
                _id: infoPerson._id,
                name: infoPerson.name,
                gender: infoPerson.gender,
                date_of_birth: infoPerson.date_of_birth,
                religion: infoPerson.religion,
                residential_group_id: infoPerson.residential_group_id,
                place_of_residence: infoPerson.place_of_residence,
                academic_level: infoPerson.academic_level,
                career: infoPerson.career
            };
            const person = new PersonModel(newPerson);
            await person.save();
            res.status(200).json('add success!');
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const updatePerson = async (req, res) => {
    try {
        const _id = req.params._id;
        let infoUpdate = req.body;
        await PersonModel.findByIdAndUpdate(_id, infoUpdate);
        res.status(200).json('update success!');
    } catch (err) {
        res.status(500).json({error: err});
    }
}