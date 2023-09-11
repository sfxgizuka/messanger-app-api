 import { Router } from 'express'
import { userRegister } from '../controller/auth'

const router = Router()
router.post('/user-register',userRegister);

export default router;