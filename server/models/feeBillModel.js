import mongoose from "mongoose";
const { Schema } = mongoose;
const Model = mongoose.model;


const feeBillSchema = new Schema({
    fee: {type :mongoose.Types.ObjectId, ref: "fees",  required:true},
    home: {type :mongoose.Types.ObjectId, ref: "homes",  required:true},
    isSubmitted: {type: Boolean, required: true, default: false},
    received: {type : Number, default: 0, min: 0}

});



export default Model("feeBills",feeBillSchema)