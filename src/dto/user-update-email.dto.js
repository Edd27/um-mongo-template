import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'
import { emailDTOSchema, passwordDTOSchema } from '#Dto/dto-types.js'

const UpdateEmailDTOSchema = Type.Object(
    {
        email: emailDTOSchema,
        password: passwordDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties:
                'Invalid properties, the object should only contain the following properties: email, password',
        },
    }
)

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier')

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
addFormats(ajv, ['email'])
addErrors(ajv)

const validateSchema = ajv.compile(UpdateEmailDTOSchema)

const userUpdateEmailDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)
    if (!isDTOValid) {
        return res.status(400).json({
            errors: validateSchema.errors.map((err) => err.message),
        })
    }
    next()
}

export default userUpdateEmailDTO
