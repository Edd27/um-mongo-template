import { jwtVerify } from 'jose'

const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).json({
            message: 'Not authorized',
        })

    const jwt = authorization.split(' ')[1]

    if (!jwt)
        return res.status(401).json({
            message: 'No token provided',
        })

    try {
        const encoder = new TextEncoder()
        const { payload } = await jwtVerify(
            jwt,
            encoder.encode(process.env.JWT_SECRET_KEY)
        )

        req.id = payload.id

        next()
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token',
        })
    }
}

export default userJWTDTO
