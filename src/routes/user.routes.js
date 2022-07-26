import userDeleteAccountController from '#Controllers/user-delete-account.controller.js'
import userLoginController from '#Controllers/user-login.controller.js'
import userProfileController from '#Controllers/user-profile.controller.js'
import userRegisterController from '#Controllers/user-register.controller.js'
import userUpdateDataController from '#Controllers/user-update-data.controller.js'
import userUpdateEmailController from '#Controllers/user-update-email.controller.js'
import userUpdatePasswordController from '#Controllers/user-update-password.controller.js'
import userDeleteAccountDTO from '#Dto/user-delete-account.dto.js'
import userJWTDTO from '#Dto/user-jwt.dto.js'
import userLoginDTO from '#Dto/user-login.dto.js'
import userRegisterDTO from '#Dto/user-register.dto.js'
import userUpdateDataDTO from '#Dto/user-update-data.dto.js'
import userUpdateEmailDTO from '#Dto/user-update-email.dto.js'
import userUpdatePasswordDTO from '#Dto/user-update-password.dto.js'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', userRegisterDTO, userRegisterController)
userRouter.post('/login', userLoginDTO, userLoginController)
userRouter.get('/profile', userJWTDTO, userProfileController)
userRouter.patch(
    '/update-data',
    userJWTDTO,
    userUpdateDataDTO,
    userUpdateDataController
)
userRouter.patch(
    '/update-email',
    userJWTDTO,
    userUpdateEmailDTO,
    userUpdateEmailController
)
userRouter.patch(
    '/update-password',
    userJWTDTO,
    userUpdatePasswordDTO,
    userUpdatePasswordController
)
userRouter.delete(
    '/delete-account',
    userJWTDTO,
    userDeleteAccountDTO,
    userDeleteAccountController
)

export default userRouter
