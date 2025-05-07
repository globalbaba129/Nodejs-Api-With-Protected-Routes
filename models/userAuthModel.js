import mongoose from "mongoose";

const userAuthSchema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
});

const userAuthTable = mongoose.model('userAuthTable',userAuthSchema)

export default userAuthTable