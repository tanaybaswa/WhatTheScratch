import { ObjectId } from "mongodb";
import mongoose, { Schema, model, models } from "mongoose";


const UserPromptSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prompt',
    },
    completed: {
        type: Boolean,
        default: false,
    },

});

const UserPrompt = models.UserPrompt || model("UserPrompt", UserPromptSchema);

export default UserPrompt;