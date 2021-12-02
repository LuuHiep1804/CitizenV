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
    gender: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    residential_group_id: {
        type: String,
        required: true,
        ref: 'residential groups'
    },
    place_of_residence: {
        type: String,
        required: true
    },
    academic_level: {
        type: String,
        required: true
    },
    career: {
        type: String,
        required: true
    }
}, {
    collection: 'person'
});

export const PersonModel = mongoose.model('person', schema);