import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sendeId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    receiverId:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    message:{
        type: String,
        required:true,
    }
});

export const Message = mongoose.model('Message', messageSchema);