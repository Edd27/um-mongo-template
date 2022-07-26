import UserModel from '#Schemas/user.schema.js'
import { compare } from 'bcrypt'

const userDeleteAccountController = async (req, res) => {
    const { id } = req
    const { password } = req.body

    const existingUserById = await UserModel.findById(id).exec()
    if (!existingUserById)
        return res.status(401).json({
            errors: ['Not authorized'],
        })

    const checkPassword = await compare(password, existingUserById.passwordHash)

    if (!checkPassword)
        return res.status(401).json({ errors: ['Password incorrect'] })

    await existingUserById.delete()

    return res.status(204).json({ errors: ['User account was deleted'] })
}

export default userDeleteAccountController
