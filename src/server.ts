import express, {Request, Response} from 'express';
import authRouter from './routes/auth'

import { databaseConnect } from './config/database'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import messengerRoute from './routes/messengerRoute';
import path from 'path'
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

dotenv.config()
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/images', express.static(path.join(__dirname, '..','/public/images/')));

app.use('/api/messenger',authRouter);
app.use('/api/messenger',messengerRoute);

const port = process.env.PORT || 5000

app.get('/',(req: Request, res: Response)=>{
    res.send('This is from backend')
})

databaseConnect();
app.listen(port, ()=>{
    console.log(`app is running on ${port}`);
})