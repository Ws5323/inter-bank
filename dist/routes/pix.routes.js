"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuthenticated_1 = __importDefault(require("../middlewares/userAuthenticated"));
const pix_controller_1 = __importDefault(require("../resources/pix/pix.controller"));
const pixRouter = (0, express_1.Router)();
pixRouter.use(userAuthenticated_1.default);
const pixController = new pix_controller_1.default();
pixRouter.post('/request', pixController.request);
pixRouter.post('/pay/:key', pixController.pay);
pixRouter.get('/transactions', pixController.transactions);
exports.default = pixRouter;
