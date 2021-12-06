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
    total_person: {
        type: Number,
        required: true
    }
}, {
    collection: 'provinces'
});

export const ProvinceModel = mongoose.model('provinces', schema);