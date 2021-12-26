import { RGroupModel } from "../models/RGroupModel.js";

export const getRgroup = async (req, res) => {
    try {
        const allRgroup = await RGroupModel.find();
        res.status(200).json(allRgroup);
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}

export const getRgroupById = async (req, res) => {
    try {
        const _id = req.params._id;
        const _Rgroup = await RGroupModel.findById({_id: _id});
        res.status(200).json(_Rgroup);
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}

export const getRgroupsByWardId = async (req, res) => {
    try {
        const ward_id = req.params._id;
        const Rgroups_by_ward_id = await RGroupModel.find({ward_id: ward_id});
        res.status(200).json(Rgroups_by_ward_id);
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}

export const createRgroup = async (req, res) => {
    try {
        const newRgroup = req.body;
        const Rgroup = new RGroupModel(newRgroup);
        await Rgroup.save();
        res.status(200).json('Thêm thôn/xóm/ bản/làng / tổ dân phố thành công!');
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}

export const updateRgroup = async (req, res) => {
    try {
        const _id = req.params._id;
        const newUpdate = req.body;
        await RGroupModel.findByIdAndUpdate(_id, newUpdate);
        res.status(200).json('cập nhật thành công!');
    } catch (err) {
        res.status(500).json('Có lỗi xảy ra!');
    }
}