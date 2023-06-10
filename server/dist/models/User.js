"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_picture: {
        // save the picture filename of the current user
        type: String,
        require: true,
    },
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
