"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.updateProfilePicture = exports.getUserByEmail = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Error_1 = require("../utils/Error");
async function createUser(user) {
    let isUserExist = await User_1.default.findOne({ email: user.email });
    if (isUserExist) {
        throw new Error_1.ResourceAlreadyExist();
    }
    let newUser = new User_1.default(user);
    await newUser.save();
}
exports.createUser = createUser;
async function getUserByEmail(email) {
    let user = await User_1.default.findOne({ email });
    if (!user) {
        throw new Error_1.ResourceNotFound();
    }
    return user;
}
exports.getUserByEmail = getUserByEmail;
async function updateProfilePicture(userId, value) {
    await User_1.default.findByIdAndUpdate(userId, { profile_picture: value });
}
exports.updateProfilePicture = updateProfilePicture;
async function getUserInfo(id) {
    let user = await User_1.default.findById(id).select("-__v -password").lean().exec();
    return user;
}
exports.getUserInfo = getUserInfo;
exports.default = {
    updateProfilePicture,
    getUserByEmail,
    createUser,
    getUserInfo,
};
