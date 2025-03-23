"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const errorHandler_1 = require("./errorHandler");
// Generic Validator Function
const validateRequest = (schema) => (req, res, next) => {
    try {
        req.body = schema(req.body); // Validate and cast request body
        next();
    }
    catch (error) {
        next(new errorHandler_1.CustomError("Invalid request format", 400));
    }
};
exports.validateRequest = validateRequest;
