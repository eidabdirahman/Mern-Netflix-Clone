import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        default: "",
        type: String
    },
    searchHistory: {
        type: Array,
        default: []
    }
},{
    timestamps: true
}
);



export const User = mongoose.model('User', UserSchema);