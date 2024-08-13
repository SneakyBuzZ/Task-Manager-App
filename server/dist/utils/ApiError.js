"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message = "Someting went wrong", error = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.error = error;
    }
}
exports.ApiError = ApiError;
