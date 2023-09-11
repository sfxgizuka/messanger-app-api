import {model,Schema} from 'mongoose';

const registerSchema = new Schema({
     userName : {
          type : String,
          required : true
     },
     email : {
          type: String,
          required : true
     },
     password : {
          type: String,
          required : true,
          select : false
     },
     image : {
          type: String,
          required : true
     }
},{timestamps : true});

let registrationModel = model('user',registerSchema);
export default registrationModel