import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    division_type: {
        type: String,
        required: true
    },
    districts: []
}, {
    collection: 'provinces'
});

export const ProvinceModel = mongoose.model('provinces', schema);