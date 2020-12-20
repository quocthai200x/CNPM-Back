import mongoose from "mongoose";
const { Schema } = mongoose;
const Model = mongoose.model;


const specialEventAwardSchema = new Schema({
    award: {type: mongoose.Types.ObjectId, ref: "awards" ,required: true},
    person: { type: mongoose.Types.ObjectId, ref: "persons", required : true},
    home: { type: mongoose.Types.ObjectId, ref: "homes", required: true},
    isAwarded : {type: Boolean, required: true, default: false},
    gifts: [{
        awardFor: {type: String, default:""},
        name: {type: String,  default: 'default gift'},
        price: {type: Number,  default: 0},
        quantity: {type: Number,  default: 1},

    }],
    

});



export default Model("specialEventAwards",specialEventAwardSchema)