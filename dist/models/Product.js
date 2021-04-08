"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var User_1 = require("./User");
var Product = /** @class */ (function () {
    function Product() {
        if (!this.id) {
            this.id = uuid_1.v4();
        }
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Product.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "user_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.User; }),
        typeorm_1.JoinColumn({ name: "user_id" }),
        __metadata("design:type", User_1.User)
    ], Product.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Product.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Product.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Product.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Product.prototype, "updated_at", void 0);
    Product = __decorate([
        typeorm_1.Entity('products'),
        __metadata("design:paramtypes", [])
    ], Product);
    return Product;
}());
exports.Product = Product;
