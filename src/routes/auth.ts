 import { Router } from 'express'
import { userRegister, userLogin } from '../controller/auth'

const router = Router()

router.post('/user-login',userLogin);
router.post('/user-register',userRegister);

export default router;