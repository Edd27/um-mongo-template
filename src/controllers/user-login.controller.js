import UserModel from '#Schemas/user.schema.js'
import { compare } from 'bcrypt'
import { SignJWT } from 'jose'

const userLoginController = async (req, res) => {
    const { email, password } = req.body

    const existingUserByEmail = await UserModel.findOne({ email }).exec()
    if (!existingUserByEmail)
        return res.status(401).json({
            message: 'Email or password is incorrect',
        })

    const checkPassword = await compare(
        password,
        existingUserByEmail.passwordHash
    )

    if (!checkPassword)
        return res
            .status(401)
            .json({ message: 'Email or password is incorrect' })

    const jwtConstructor = new SignJWT({ id: existingUserByEmail._id })
    const encoder = new TextEncoder()
    const jwt = await jwtConstructor
        .setProtectedHeader({
            alg: 'HS256',
            typ: 'JWT',
        })
        .setIssuedAt()
        .setExpirationTime('365d')
        .sign(encoder.encode(process.env.JWT_SECRET_KEY))

    return res.json({ token: jwt })
}

export default userLoginController
