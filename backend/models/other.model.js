import mongoose from "mongoose";

const otherSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: {
        type: String,  
        required: true
    },
    file: {
        type: String,  
        required: true
    }
}, { timestamps: true });

export const Other = mongoose.model('Other', otherSchema);
