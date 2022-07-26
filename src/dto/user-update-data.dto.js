import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import { nameDTOSchema, surnameDTOSchema } from '#Dto/dto-types.js'

const UpdateDataDTOSchema = Type.Object(
    {
        name: nameDTOSchema,
        surname: surnameDTOSchema,
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties:
                'Invalid properties, the object should only contain the following properties: name, surname',
        },
    }
)

const ajv = new Ajv({ allErrors: true })
    .addKeyword('kind')
    .addKeyword('modifier')

addErrors(ajv)

const validateSchema = ajv.compile(UpdateDataDTOSchema)

const userUpdateDataDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)
    if (!isDTOValid) {
        return res.status(400).json({
            errors: validateSchema.errors.map((err) => err.message),
        })
    }
    next()
}

export default userUpdateDataDTO
