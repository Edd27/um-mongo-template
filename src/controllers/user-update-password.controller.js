import UserModel from '#Schemas/user.schema.js'
import { compare, hash } from 'bcrypt'

const userUpdatePasswordController = async (req, res) => {
    const { id } = req
    const { oldPassword, newPassword } = req.body

    const existingUserById = await UserModel.findById(id).exec()
    if (!existingUserById)
        return res.status(401).json({
            message: 'Not authorized',
        })

    const checkPassword = await compare(
        oldPassword,
        existingUserById.passwordHash
    )

    if (!checkPassword)
        return res.status(401).json({ message: 'Password incorrect' })

    if (oldPassword === newPassword)
        return res.status(400).json({
            message: 'New password cannot be the same as the current one',
        })

    const hashedPassword = await hash(newPassword, 12)
    existingUserById.passwordHash = hashedPassword
    await existingUserById.save()

    return res.json({ message: 'User password updated' })
}

export default userUpdatePasswordController
