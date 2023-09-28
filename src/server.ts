import express, {Request, Response} from 'express';
import authRouter from './routes/auth'

import { databaseConnect } from './config/database'
const app = express();
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


dotenv.config()
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/messenger',authRouter);

const port = process.env.PORT || 5000

app.get('/',(req: Request, res: Response)=>{
    res.send('This is from backend')
})

databaseConnect();
app.listen(port, ()=>{
    console.log(`app is running on ${port}`);
})