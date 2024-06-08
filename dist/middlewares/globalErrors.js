"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrors = void 0;
const AppError_1 = __importDefault(require("../shared/AppError"));
function globalErrors(err, request, response, next) {
    if (err instanceof AppError_1.default) {
        response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            data: err === null || err === void 0 ? void 0 : err.data
        });
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}
exports.globalErrors = globalErrors;
