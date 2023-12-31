import  {Router} from  'express'
import {ImageMessageSend, getFriends, messageGet, messageUploadDB} from '../controller/messangerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();


router.get('/get-friends',authMiddleware,getFriends);
router.post('/send-message',authMiddleware, messageUploadDB);
router.get('/get-message/:id',authMiddleware, messageGet);
router.post('/image-message-send',authMiddleware, ImageMessageSend);


export default router;