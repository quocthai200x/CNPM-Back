import mongoose from "mongoose";
const { Schema } = mongoose;
const Model = mongoose.model;


const awardSchema = new Schema({
    name: {type: String, required: true},
    type : {type : Number, required: true},
    description: {type: String, required: true},
    gifts: [{
        awardFor:{type: String,required: true},
        name: {type: String, required: true, default: 'default gift'},
        price: {type: Number, required: true, default: 0},
    }],
    from: {type: Date, required: true},
    to: {type: Date, required : true},
    created_at: {type: Date,default :Date.now()},
    isDone:{type:Boolean,default: false,}
});



export default Model("awards",awardSchema)