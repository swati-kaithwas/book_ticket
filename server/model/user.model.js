const {Schema,model} = require("mongoose");
const validator =require("validator")
const user = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'name is not required!'],
    },
    password:{
        type:String,
        trim:true,
      required:[true,'password ise required!']
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
       required:[true, 'email is required!']
    },
    mobile_no:{
        type:String,
        trim:true,
        index:true,
        default:""
    },
    userToken:{
        type:String,
        default:"",

    },
    user_role:{
        type:String,
        enum:["user","creator","admin"],
        default:"user"
    }

},
{timestamps: true}
)
const User = model("user",user);
module.exports =User;