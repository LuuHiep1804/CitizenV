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
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    manager: {
        type: String
    },
    license_status: {
        type: Boolean,
        default: false
    },
    license_date: {
        type: String,
        default: ""
    },
    license_term: {
        type: String,
        default: ""
    },
    license_start: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        default: ""
    }
}, {
    collection: 'accounts'
});

export const AccountModel = mongoose.model('accounts', schema);
