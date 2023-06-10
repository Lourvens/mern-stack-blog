"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const healthCheck = (req, res) => {
    res.status(200).json({ message: "Ok!" });
};
exports.default = healthCheck;
