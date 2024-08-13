"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
var asyncHandler = function (requestHandlerFn) {
    return function (req, res, next) {
        requestHandlerFn(req, res, next).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
