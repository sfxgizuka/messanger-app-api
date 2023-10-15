import  {Router} from  'express'
import {getFriends} from '../controller/messangerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.get('/get-friends',authMiddleware,getFriends);


export default router;