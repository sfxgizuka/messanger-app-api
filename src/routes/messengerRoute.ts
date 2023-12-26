import  {Router} from  'express'
import {getFriends, messageGet, messageUploadDB} from '../controller/messangerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.get('/get-friends',authMiddleware,getFriends);
router.post('/send-message',authMiddleware, messageUploadDB);
router.get('/get-message/:id',authMiddleware, messageGet);


export default router;