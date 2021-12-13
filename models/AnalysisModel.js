import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    age_and_gender: {
        type: Array,
        required: true
    },
    job: {
        type: Object,
        required: true
    },
    religion: {
        type: Object,
        required: true
    }
},{timestamps: true}, {
    collection: 'analyses'
});

export const AnalysisModel = mongoose.model('analyses', schema);