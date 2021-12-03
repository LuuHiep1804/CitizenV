import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    province_id: {
        type: String,
        required: true,
        ref: 'provinces'
    },
    status: {
        type: String,
        default: 'not authorized'
    },
    license_term: {
        type: String,
        default: " "
    }
}, {
    collection: 'accounts'
});

export const AccountModel = mongoose.model('accounts', schema);
