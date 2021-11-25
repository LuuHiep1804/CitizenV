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
    province_id: {
        type: String,
        required: true,
        ref: 'provinces'
    },
    wards: []
}, {
    collection: 'districts'
});

export const DistrictModel = mongoose.model('districts', schema);