import mongoose from "mongoose";
const { Schema } = mongoose;
const Model = mongoose.model;


const personSchema = new Schema({
    name: { type :String, required:true},
    dob: { type : Date, required:true},
    home: {type : mongoose.Types.ObjectId, ref : "homes", required: true},
    work_at: {type:String, required: true},
    cmnd: { type :String, default: null},
    gender: { type :String, default: null, lowercase: true},
    created_at: {type: Date,default :Date.now()},

});



export default Model("persons",personSchema)