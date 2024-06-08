"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../resources/user/user.controller");
const userAuthenticated_1 = __importDefault(require("../middlewares/userAuthenticated"));
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
userRouter.post('/signin', userController.signin);
userRouter.post('/signup', userController.signup);
userRouter.get('/me', userAuthenticated_1.default, userController.me);
exports.default = userRouter;
