import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 20,
        },
        surname: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
        },
        passwordHash: {
            type: String,
            required: true,
            minLength: 10,
            maxLength: 25,
        },
    },
    { timestamps: true }
)

const userModel = model('User', userSchema)

export default userModel
