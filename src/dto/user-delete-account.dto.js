import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import { passwordDTOSchema } from '#Dto/dto-types.js'

const DeleteAccountDTOSchema = Type.Object(
    {
        password: passwordDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties:
                'Invalid properties, the object should only contain the following properties: password',
        },
    }
)

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier')

ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
addErrors(ajv)

const validateSchema = ajv.compile(DeleteAccountDTOSchema)

const userDeleteAccountDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)
    if (!isDTOValid) {
        return res.status(400).json({
            errors: validateSchema.errors.map((err) => err.message),
        })
    }
    next()
}

export default userDeleteAccountDTO
