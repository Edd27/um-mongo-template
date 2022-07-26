import { SALT } from '#Constants/salt.js'
import UserModel from '#Schemas/user.schema.js'
import { hash } from 'bcrypt'

const userRegisterController = async (req, res) => {
    const { _id, name, surname, email, password } = req.body

    const existingUserById = await UserModel.findById(_id).exec()
    if (existingUserById)
        return res.status(409).json({
            errors: ['User already exists'],
        })

    const existingUserByEmail = await UserModel.findOne({ email }).exec()
    if (existingUserByEmail)
        return res.status(409).json({
            errors: ['Email is already in use'],
        })

    const passwordHash = await hash(password, SALT)

    const user = new UserModel({
        _id,
        name,
        surname,
        email,
        passwordHash,
    })

    await user.save()

    return res.status(201).json({ message: 'User registered' })
}

export default userRegisterController
