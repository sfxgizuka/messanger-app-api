import {model,Schema} from 'mongoose';

const messageSchema = new Schema({
     senderId : {
          type : String,
          required : true
     },
     senderName : {
          type: String,
          required : true
     },
     receiverId : {
          type: String,
          required : true          
     },
     message : {
          text : {
               type: String,
               default : ''
          },
          image : {
               type : String,
               default : ''
          }           
     },
     status :{
          type : String,
          default : 'unseen'
     }
},{timestamps : true});

let messageModel = model('message',messageSchema);
export default messageModel;