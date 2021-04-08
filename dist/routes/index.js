"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_routers_1 = __importDefault(require("./users.routers"));
var products_routers_1 = __importDefault(require("./products.routers"));
var session_routers_1 = __importDefault(require("./session.routers"));
var routes = express_1.Router();
routes.use('/users', users_routers_1.default);
routes.use('/products', products_routers_1.default);
routes.use('/', session_routers_1.default);
exports.default = routes;
