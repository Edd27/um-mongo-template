import UserModel from '#Schemas/user.schema.js'
import { compare } from 'bcrypt'

const userUpdateEmailController = async (req, res) => {
    const { id } = req
    const { email, password } = req.body

    const existingUserById = await UserModel.findById(id).exec()
    if (!existingUserById)
        return res.status(401).json({
            message: 'Not authorized',
        })

    const checkPassword = await compare(password, existingUserById.passwordHash)

    if (!checkPassword)
        return res.status(401).json({ message: 'Password incorrect' })

    if (existingUserById.email === email)
        return res
            .status(400)
            .json({ message: 'Email cannot be the same as the current one' })

    const existingUserByEmail = await UserModel.findOne({ email }).exec()
    if (existingUserByEmail)
        return res.status(401).json({
            message: 'Email is already in use',
        })

    existingUserById.email = email
    await existingUserById.save()

    return res.json({ message: 'User email updated' })
}

export default userUpdateEmailController
