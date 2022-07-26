import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'
import {
    emailDTOSchema,
    idDTOSchema,
    nameDTOSchema,
    passwordDTOSchema,
    surnameDTOSchema,
} from '#Dto/dto-types.js'

const RegisterDTOSchema = Type.Object(
    {
        _id: idDTOSchema,
        name: nameDTOSchema,
        surname: surnameDTOSchema,
        email: emailDTOSchema,
        password: passwordDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties:
                'Invalid properties, the object should only contain the following properties: _id, name, surname, email, password',
        },
    }
)

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier')

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
addFormats(ajv, ['email', 'uuid'])
addErrors(ajv)

const validateSchema = ajv.compile(RegisterDTOSchema)

const userRegisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)
    if (!isDTOValid) {
        return res.status(400).json({
            errors: validateSchema.errors.map((err) => err.message),
        })
    }
    next()
}

export default userRegisterDTO
