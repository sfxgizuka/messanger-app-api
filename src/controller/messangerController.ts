import { Request, Response } from 'express'
import User from '../model/authModel';
import messageModel from '../model/messageModel';

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

export const messageUploadDB = async (req:any, res:Response) =>{
     console.log('entered')
     const {
          senderName,
          receiverId,
          message
     } = req.body

     const senderId = req.myId;

     try{
          const insertMessage = await messageModel.create({
               senderId : senderId,
               senderName : senderName,
               receiverId : receiverId,
               message : {
                    text: message,
                    image : ''
               }
          })
          res.status(201).json({
               success : true,
               message: insertMessage
          })

     }catch (error){
          res.status(500).json({
               error: {
                    errorMessage : 'Internal Sever Error'
               }
          })
     }
}

export const messageGet = async(req:any, res:Response) => {
     const myId = req.myId;
     const fdId = req.params.id;

     try{
          let getAllMessage = await messageModel.find({})

          getAllMessage = getAllMessage.filter((m: any)=>m.senderId === myId && m.receiverId === fdId || m.receiverId ===  myId && m.senderId === fdId );

          res.status(200).json({
               success: true,
               message: getAllMessage
          })

     }catch (error){
          res.status(500).json({
               error: {
                    errorMessage : 'Internal Server error'
               }
          })

     }

}