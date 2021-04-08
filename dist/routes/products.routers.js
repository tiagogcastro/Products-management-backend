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
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var ListAllProductsService_1 = __importDefault(require("../services/Product/ListAllProductsService"));
var CreateProductService_1 = __importDefault(require("../services/Product/CreateProductService"));
var UpdateProductService_1 = __importDefault(require("../services/Product/UpdateProductService"));
var DeleteProductService_1 = __importDefault(require("../services/Product/DeleteProductService"));
var ListOneProductService_1 = __importDefault(require("../services/Product/ListOneProductService"));
var productsRouter = express_1.Router();
productsRouter.post('/create', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, name, quantity, price, createProductService, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = request.user.id;
                _a = request.body, name = _a.name, quantity = _a.quantity, price = _a.price;
                createProductService = new CreateProductService_1.default();
                return [4 /*yield*/, createProductService.execute({
                        userId: userId,
                        name: name,
                        quantity: quantity,
                        price: price
                    })];
            case 1:
                data = _b.sent();
                return [2 /*return*/, response.json({ data: data })];
        }
    });
}); });
productsRouter.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var listAllProductsService, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                listAllProductsService = new ListAllProductsService_1.default();
                return [4 /*yield*/, listAllProductsService.execute({})];
            case 1:
                data = _a.sent();
                return [2 /*return*/, response.json(data)];
        }
    });
}); });
productsRouter.get('/:productId', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, listOneProductService, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = request.params.productId;
                listOneProductService = new ListOneProductService_1.default();
                return [4 /*yield*/, listOneProductService.execute({
                        productId: productId
                    })];
            case 1:
                data = _a.sent();
                return [2 /*return*/, response.json(data)];
        }
    });
}); });
productsRouter.put('/:productId/edit', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, quantity, productId, updateProductService, productUpdated;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, name = _a.name, price = _a.price, quantity = _a.quantity;
                productId = request.params.productId;
                updateProductService = new UpdateProductService_1.default();
                return [4 /*yield*/, updateProductService.execute({
                        id: productId,
                        name: name,
                        price: price,
                        quantity: quantity
                    })];
            case 1:
                productUpdated = _b.sent();
                return [2 /*return*/, response.json(productUpdated)];
        }
    });
}); });
productsRouter.delete('/:productId/delete', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, productId, deleteProductService;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = request.user.id;
                productId = request.params.productId;
                deleteProductService = new DeleteProductService_1.default();
                return [4 /*yield*/, deleteProductService.execute({
                        userId: userId,
                        productId: productId
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, response.json({
                        success: "Produto deletado com sucesso."
                    })];
        }
    });
}); });
exports.default = productsRouter;
