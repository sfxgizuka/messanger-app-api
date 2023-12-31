import { Request, Response } from 'express'
import User from '../model/authModel';
import messageModel from '../model/messageModel';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path'

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

export const ImageMessageSend = (req:any, res:Response) => {
     const senderId = req.myId;
     const form = formidable();

     form.parse(req, (err, fields, files:any) => {
          const {
              senderName,
              receiverId,
              imageName 
          } = fields;

          // const newPath = __dirname + `../../../frontend/public/image/${imageName}`
          // const newPath = __dirname + `./${imageName}`
          const newPath = path.join(__dirname, '../../public/images', files.image.originalFilename);
          files.image.originalFilename = imageName;

          try{
               fs.copyFile(files.image.filepath, newPath, async (err)=>{
                    if(err){
                         res.status(500).json({
                              error : {
                                   errorMessage: 'Image upload fail'
                              }
                         })
                    } else{
                         const insertMessage = await messageModel.create({
                              senderId : senderId,
                              senderName : senderName,
                              receiverId : receiverId,
                              message : {
                                   text: '',
                                   image : files.image.originalFilename
                              }
                         })
                         res.status(201).json({
                              success : true,
                              message: insertMessage
                         })

                    }
               } )

          }catch{
               res.status(500).json({
                    error : {
                         errorMessage: 'Internal Sever Error'
                    }
               })
          }


     })
}