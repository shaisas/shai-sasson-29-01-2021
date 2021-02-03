const { Schema, model } = require('mongoose');

const mailSchema = new Schema(
    {
        sender: {
            type: Object,
            required: true
        },
        receiver: {
            type: Object,
            required: true
        },
        subject: {
            type: String,
            default: ''
        },
        paragraph: {
            type: String,
            default: ''
        },
        date: {
            type: Date,
            default: Date.now()
        },
        isRead: {
            type: Boolean,
            default: false
        },
        isFavorites: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const userSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        mails: [ mailSchema ]
    },
    {
        timestamps: true
    }
);

const User = model('User', userSchema);

module.exports = User;
