import  mongoose  from "mongoose";

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
    ward_id: {
        type: String,
        required: true,
        ref: 'wards'
    }
}, {
    collection: 'residential groups'
});

export const RGroupModel = mongoose.model('residential groups', schema);