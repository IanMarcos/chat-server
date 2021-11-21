const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },

    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    active:{
        type: Boolean,
        default: true
    }
})

module.exports = model('User', UserSchema);
