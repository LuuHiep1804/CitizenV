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
    district_id: {
        type: String,
        required: true,
        ref: 'districts'
    },
    total_person: {
        type: Number,
        required: true
    }
}, {
    collection: 'wards'
});

export const WardModel = mongoose.model('wards', schema);