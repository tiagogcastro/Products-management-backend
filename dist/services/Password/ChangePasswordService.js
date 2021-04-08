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
var bcryptjs_1 = require("bcryptjs");
var typeorm_1 = require("typeorm");
var AppError_1 = __importDefault(require("../../errors/AppError"));
var User_1 = require("../../models/User");
var ChangePasswordService = /** @class */ (function () {
    function ChangePasswordService() {
    }
    ChangePasswordService.prototype.execute = function (_a) {
        var id = _a.id, password = _a.password, newPassword = _a.newPassword, repeatPassword = _a.repeatPassword;
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, findUser, passwordUnHashed, newPasswordHashed, userUpdatedPassword, passwordUpdated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne(id)];
                    case 1:
                        findUser = _b.sent();
                        if (!findUser) {
                            throw new AppError_1.default('You need to be logged in to update the user');
                        }
                        return [4 /*yield*/, bcryptjs_1.compare(password, findUser.password)];
                    case 2:
                        passwordUnHashed = _b.sent();
                        if (!passwordUnHashed) {
                            throw new AppError_1.default('A senha antiga está errada.');
                        }
                        if (newPassword !== repeatPassword) {
                            throw new AppError_1.default('As senhas não são iguais.');
                        }
                        if (password === newPassword) {
                            throw new AppError_1.default('A nova senha não pode ser igual a antiga.');
                        }
                        if (newPassword.length < 6) {
                            throw new AppError_1.default('A nova senha deve ter no mínimo 6 digitos.');
                        }
                        return [4 /*yield*/, bcryptjs_1.hash(newPassword, 8)];
                    case 3:
                        newPasswordHashed = _b.sent();
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).update(id, {
                                password: newPasswordHashed,
                                updated_at: new Date()
                            })];
                    case 4:
                        userUpdatedPassword = _b.sent();
                        if (!(userUpdatedPassword.affected === 1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(id)];
                    case 5:
                        passwordUpdated = _b.sent();
                        return [2 /*return*/, passwordUpdated];
                    case 6: throw new AppError_1.default('User not found for update password');
                }
            });
        });
    };
    return ChangePasswordService;
}());
exports.default = ChangePasswordService;
