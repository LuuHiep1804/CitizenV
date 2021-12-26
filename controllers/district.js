import { DistrictModel } from "../models/DistrictModel.js";

export const getDistrict = async (req, res) => {
    try {
        const allDistrict = await DistrictModel.find();
        res.status(200).json(allDistrict);
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}

export const getDistrictById = async (req, res) => {
    try {
        const _id = req.params._id;
        const district = await DistrictModel.findById({_id: _id});
        res.status(200).json(district);
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}

export const getDistrictsByProvinceId = async (req, res) => {
    try {
        const province_id = req.params._id;
        const districts_by_province_id = await DistrictModel.find({province_id: province_id});
        res.status(200).json(districts_by_province_id);
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}

export const createDistrict = async (req, res) => {
    try {
        const newDistrict = req.body;
        const district = new DistrictModel(newDistrict);
        await district.save();
        res.status(200).json('thêm quận/huyện thành công!');
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}

export const updateDistrict = async (req, res) => {
    try {
        const _id = req.params._id;
        const newUpdate = req.body;
        await DistrictModel.findByIdAndUpdate(_id, newUpdate);
        res.status(200).json("cập nhật thành công!");
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}