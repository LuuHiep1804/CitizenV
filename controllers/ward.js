import { WardModel } from "../models/WardModel.js";

export const getWard = async (req, res) => {
    try {
        const allWard = await WardModel.find();
        res.status(200).json(allWard);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const getWardById = async (req, res) => {
    try {
        const _id = req.params._id;
        const ward = await WardModel.findById({_id: _id});
        res.status(200).json(ward);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const createWard = async (req, res) => {
    try {
        const newWard = req.body;
        const ward = new WardModel(newWard);
        await ward.save();
        res.status(200).json('Thêm phường / xã thành công!');
    } catch (err) {
        res.status(500).json({error: err});
    }
}

export const updateWard = async (req, res) => {
    try {
        const _id = req.params._id;
        const newUpdate = req.body;
        await WardModel.findByIdAndUpdate(_id, newUpdate);
        res.status(200).json('update success!');
    } catch (err) {
        res.status(500).json({error: err});
    }
}