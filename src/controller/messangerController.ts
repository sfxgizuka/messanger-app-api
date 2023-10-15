import { Request, Response } from 'express'
import User from '../model/authModel';

export const getFriends = async (req:any, res:Response) => {
    const myId = req?.myId;
     try{
          const friendGet = await User.find({});
          const filter = friendGet.filter(d=>d.id !== myId );
          res.status(200).json({success:true, friends : filter})

     }catch (error) {
          res.status(500).json({
               error: {
                    errorMessage :'Internal Sever Error'
               }
          })
     }
}