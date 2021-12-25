import { DistrictModel } from "../models/DistrictModel.js";
import { PersonModel } from "../models/PersonModel.js";
import { ProvinceModel } from "../models/ProvinceModel.js";
import { RGroupModel } from "../models/RGroupModel.js";
import { WardModel } from "../models/WardModel.js";

const formPerson = (people) => {
    people = people.map(person => {
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
    return people;
}

const searchByName = async (name, group_id) => {
    return await PersonModel.find({$text: {$search: name}}, { score: { $meta: "textScore"}})
    .sort({score: {$meta: "textScore"}})
    .find({residential_group_id: group_id})
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
}

const removeAccents = (str) => {
    return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
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

export const getPersonByName = async (req, res) => {
    try {
        const name = removeAccents(req.body.name);
        const local_id = req.body._id;
        let people = [];
        if(local_id) {
            if(local_id.length == 2) {
                let districts = await DistrictModel.find({province_id: local_id});
                districts = districts.map(district => {
                    return district._id;
                });
                let wards = [];
                for(let i = 0; i < districts.length; i++) {
                    let _wards = await WardModel.find({district_id: districts[i]});
                    _wards.forEach(ward => {
                        wards.push(ward._id);
                    });
                }
                let groups = [];
                for(let i = 0; i < wards.length; i++) {
                    let _groups = await RGroupModel.find({ward_id: wards[i]});
                    _groups.forEach(group => {
                        groups.push(group._id);
                    });
                }
                for(let i = 0; i < groups.length; i++) {
                    let personByGroupId = await searchByName(name, groups[i]);
                    personByGroupId.forEach(person => {
                        people.push(person);
                    });
                }
            }else if(local_id == 4) {
                const wards = await WardModel.find({district_id: local_id});
                let groups = [];
                for (let i = 0; i < wards.length; i++) {
                    let _groups = await RGroupModel.find({ward_id: wards[i]._id});
                    _groups.forEach(_group => {
                        groups.push(_group._id);
                    });
                }
                for(let i = 0; i < groups.length; i++) {
                    let personByGroupId = await searchByName(name, groups[i]);
                    personByGroupId.forEach(person => {
                        people.push(person);
                    });
                }
            }else if(local_id == 6) {
                const groups = await RGroupModel.find({ward_id: local_id});
                for(let i = 0; i < groups.length; i++) {
                    let personByGroupId = await searchByName(name, groups[i]);
                    personByGroupId.forEach(person => {
                        people.push(person);
                    });
                }
            }else {
                let personByGroupId = await searchByName(name, local_id);
                personByGroupId.forEach(person => {
                    people.push(person);
                });
            }
        }else {
            let personByGroupId = await PersonModel.find({$text: {$search: name}}, { score: { $meta: "textScore"}})
            .sort({score: {$meta: "textScore"}})
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
            personByGroupId.forEach(person => {
                people.push(person);
            });
        }
        res.status(200).json(formPerson(people));
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getPersonByRGroupId = async (req, res) => {
    try {
        const residential_group_id = req.params._id;
        let personByRGroupId 
        = await PersonModel.find({
            residential_group_id: residential_group_id
        })
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
        res.status(200).json(formPerson(personByRGroupId));
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getPersonByWardId = async (req, res) => {
    try {
        const ward_id = req.params._id;
        const group_id = await RGroupModel.find({ward_id: ward_id});
        let personByWardId = [];
        for (let i = 0; i < group_id.length; i++) {
            let personByRGroupId 
            = await PersonModel.find({residential_group_id: group_id[i]})
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
            personByRGroupId.forEach(person => {
                personByWardId.push(person);
            })
        }
        res.status(200).json(formPerson(personByWardId));
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getPersonByDistrictId = async (req, res) => {
    try {
        const district_id = req.params._id;
        const wards = await WardModel.find({district_id: district_id});
        let groups = [];
        for (let i = 0; i < wards.length; i++) {
            let _groups = await RGroupModel.find({ward_id: wards[i]._id});
            _groups.forEach(_group => {
                groups.push(_group._id);
            })
        }
        let personByDistrict = [];
        for(let i = 0; i < groups.length; i++) {
            let personByRGroupId 
            = await PersonModel.find({
                residential_group_id: groups[i]
            })
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
            personByRGroupId.forEach(person => {
                personByDistrict.push(person);
            })
        }
        res.status(200).json(formPerson(personByDistrict)); 
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getPersonByProvinceId = async (req, res) => {
    try {
        const province_id = req.params._id;
        let districts = await DistrictModel.find({province_id: province_id});
        districts = districts.map(district => {
            return district._id;
        });
        let wards = [];
        for(let i = 0; i < districts.length; i++) {
            let _wards = await WardModel.find({district_id: districts[i]});
            _wards.forEach(ward => {
                wards.push(ward._id);
            });
        }
        let groups = [];
        for(let i = 0; i < wards.length; i++) {
            let _groups = await RGroupModel.find({ward_id: wards[i]});
            _groups.forEach(group => {
                groups.push(group._id);
            })
        }
        let personByProvince = [];
        for(let i = 0; i < groups.length; i++) {
            let personByRGroupId 
                = await PersonModel.find({
                    residential_group_id: groups[i]
                })
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
                personByRGroupId.forEach(person => {
                    personByProvince.push(person);
                });
        }
        res.status(200).json(formPerson(personByProvince));
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