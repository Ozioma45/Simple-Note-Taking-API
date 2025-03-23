"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
};
exports.errorHandler = errorHandler;
