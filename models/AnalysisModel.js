import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    total_person: {
        type: Number,
        required: true
    },
    gender_by_age: {
        type: Object,
        required: true
    },
    career: {
        type: Object,
        required: true
    },
    religion: {
        type: Object,
        required: true
    },
    belong: {
        type: String,
        default: ""
    }
},{timestamps: true}, {
    collection: 'analyses'
});

export const AnalysisModel = mongoose.model('analyses', schema);