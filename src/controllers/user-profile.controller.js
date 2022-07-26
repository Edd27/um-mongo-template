import UserModel from '#Schemas/user.schema.js'

const userProfileController = async (req, res) => {
    const { id } = req

    const existingUserById = await UserModel.findById(id).exec()
    if (!existingUserById)
        return res.status(401).json({
            message: 'Not authorized',
        })

    const { _id, name, surname, email } = existingUserById

    return res.json({ _id, name, surname, email })
}

export default userProfileController
