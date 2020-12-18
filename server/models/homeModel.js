import mongoose from "mongoose";
const { Schema } = mongoose;
const Model = mongoose.model;


const homeSchema = new Schema({
    username: { type:String,required:true,},
    password: { type:String,required:true, select: false},
    host: { type:String,required:true,},
    phonenumber: { type:String, default: null},
    created_at: {type: Date,default :Date.now()},
    address:{
        detail: { type:String,required:true,},
        city:{
            id : {
                type: Number,
                required: true,
            },
            name:  {
                type: String,
                required: true,
            },
        },
        district: {
            id : {
                type: Number,
                required: true,
            },
            name:  {
                type: String,
                required: true,
            },
        },
        commune:{
            id : {
                type: Number,
                required: true,
            },
            name:  {
                type: String,
                required: true,
            },
        },
    },
    members:[{type: mongoose.Types.ObjectId, ref: "persons", }],
});






export default Model("homes",homeSchema);