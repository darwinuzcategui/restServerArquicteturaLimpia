//import mongoose from "mongoose";
import mongoose, { Schema} from "mongoose";

//const usuario1Schema = new mongoose.Schema|
const usuarioSchema = new Schema({

    name: {
        type: String,
        required: [true,'Name is required']
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Password is required'],

    },
    img: {
        type: String,
    },
    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE','ADMIN_ROLE','VENTAS_ROLES'],
    }

});

export const UserModel = mongoose.model('User',usuarioSchema);


