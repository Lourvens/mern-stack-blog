"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * this function is use to obtain the user credentials stored in the `req.header.authorization` as a bearer jwt token and return decoded value. make sure, `useCredentials` is called in a `protected route` by the `isAuthenticated` middleware.
 * otherwise an Error will be thrown
 */
function useCredentials(req) {
    const token = req.headers["authorization"]?.split(" ")[1];
    const credentials = jsonwebtoken_1.default.decode(token);
    if (!credentials) {
        throw new Error("token incorrect or null");
    }
    return credentials;
}
exports.default = useCredentials;
