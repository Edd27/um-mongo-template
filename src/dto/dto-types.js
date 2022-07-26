import { Type } from '@sinclair/typebox'

export const idDTOSchema = Type.String({
    format: 'uuid',
    errorMessage: {
        type: '_id type is invalid, must be a string',
        format: '_id format is invalid, must meet the uuid4 format',
    },
})
export const nameDTOSchema = Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
        minLength: 'name must contain at least 2 characters',
        maxLength: 'name must contain at most 20 characters',
    },
})
export const surnameDTOSchema = Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
        minLength: 'surname must contain at least 4 characters',
        maxLength: 'surname must contain at most 50 characters',
    },
})
export const emailDTOSchema = Type.String({
    format: 'email',
    errorMessage: {
        type: 'email type is invalid, must be a string',
        format: 'email format is invalid, must meet the RFC 5322 standard for email addresses',
    },
})
export const passwordDTOSchema = Type.String({
    format: 'password',
    minLength: 10,
    maxLength: 25,
    errorMessage: {
        type: 'password type is invalid, must be a string',
        format: 'password format is invalid, must contain at least one uppercase letter, one lowercase letter, and one number',
        minLength: 'password must contain at least 10 characters',
        maxLength: 'password must contain at most 25 characters',
    },
})
