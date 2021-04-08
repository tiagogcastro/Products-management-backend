"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var CreateUserService_1 = __importDefault(require("../services/User/CreateUserService"));
var ChangePasswordService_1 = __importDefault(require("../services/Password/ChangePasswordService"));
var UpdateUserService_1 = __importDefault(require("../services/User/UpdateUserService"));
var DeleteUserService_1 = __importDefault(require("../services/User/DeleteUserService"));
var UserLoggedService_1 = __importDefault(require("../services/User/UserLoggedService"));
var usersRouter = express_1.Router();
usersRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, name, password, createUser, user, secret, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, name = _a.name, password = _a.password;
                createUser = new CreateUserService_1.default();
                return [4 /*yield*/, createUser.execute({
                        email: email,
                        name: name,
                        password: password,
                    })];
            case 1:
                user = _b.sent();
                secret = auth_1.default.jwt.secret;
                token = jsonwebtoken_1.sign({}, secret, {
                    subject: user.id,
                    expiresIn: 86400000,
                });
                return [2 /*return*/, response.json({
                        user: user,
                        token: token
                    })];
        }
    });
}); });
usersRouter.get('/', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userLoggedService, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.user.id;
                userLoggedService = new UserLoggedService_1.default();
                return [4 /*yield*/, userLoggedService.execute({
                        id: id
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, response.json(data)];
        }
    });
}); });
usersRouter.put('/edit', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, email, name, user, update;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = request.user.id;
                _a = request.body, email = _a.email, name = _a.name;
                user = new UpdateUserService_1.default();
                return [4 /*yield*/, user.execute({
                        id: id,
                        email: email,
                        name: name
                    })];
            case 1:
                update = _b.sent();
                return [2 /*return*/, response.json(update)];
        }
    });
}); });
usersRouter.delete('/delete', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userDeleteService;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.user.id;
                userDeleteService = new DeleteUserService_1.default();
                return [4 /*yield*/, userDeleteService.execute({
                        id: id
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, response.json({
                        success: "Usuário deletado com sucesso."
                    })];
        }
    });
}); });
// Sem está logado
// usersRouter.post('/reset-password', async (request, response) => {
// });
// Logado
usersRouter.put('/alter-password', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, password, newPassword, repeatPassword, user, update;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = request.user.id;
                _a = request.body, password = _a.password, newPassword = _a.newPassword, repeatPassword = _a.repeatPassword;
                user = new ChangePasswordService_1.default();
                return [4 /*yield*/, user.execute({
                        id: id,
                        password: password,
                        newPassword: newPassword,
                        repeatPassword: repeatPassword
                    })];
            case 1:
                update = _b.sent();
                return [2 /*return*/, response.json(update)];
        }
    });
}); });
exports.default = usersRouter;
