import { ProvinceModel } from '../models/ProvinceModel.js';

export const getAllProvince = async (req, res) => {
    try {
        const allProvince = await ProvinceModel.find();
        res.status(200).json(allProvince);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getProvinceById = async (req, res) => {
    try {
        const _id = req.params._id;
        const province = await ProvinceModel.findById({_id: _id});
        res.status(200).json(province);
    } catch (err) {
        console.log({error: err});
    }
}

export const createProvince = async (req, res) => {
    try {
        const newProvince = req.body;
        const province = new ProvinceModel(newProvince);
        await province.save();
        res.status(200).json("thêm tỉnh/thành thành công!");
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const updateProvince = async(req, res) => {
    try {
        const _id = req.params._id;
        const newUpdate = req.body;
        await ProvinceModel.findByIdAndUpdate(_id, newUpdate);
        res.status(200).json("update success!");
    } catch (err) {
        res.status(500).json({error: err});
    }
}
