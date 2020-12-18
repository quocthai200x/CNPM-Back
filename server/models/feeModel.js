import mongoose from "mongoose";
const { Schema } = mongoose;
const Model = mongoose.model;


const feeSchema = new Schema({
    name: {type: String, required: true},
    type : {type : Number, required: true},
    description: {type: String, required: true},
    from: {type: Date, required:true},
    to: {type: Date, required: true},
    price: {type: Number ,required: true, min: 0 },
    created_at: {type: Date,default :Date.now()},
    isRequired: {type :Boolean, required: true},
    isDone: {type: Boolean, default: false},
});



export default Model("fees",feeSchema)