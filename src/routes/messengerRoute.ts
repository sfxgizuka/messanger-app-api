import  {Router} from  'express'
import {getFriends, messageUploadDB} from '../controller/messangerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.get('/get-friends',authMiddleware,getFriends);
router.post('/send-message',authMiddleware, messageUploadDB);


export default router;