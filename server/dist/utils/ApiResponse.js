"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode < 400 ? "Success" : "Failure";
    }
}
exports.ApiResponse = ApiResponse;
