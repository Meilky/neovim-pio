"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMenu = void 0;
var readline_1 = __importDefault(require("readline"));
var Table_1 = require("./Table");
var CMenu = /** @class */ (function (_super) {
    __extends(CMenu, _super);
    function CMenu(name, options) {
        var _this = _super.call(this, name, options) || this;
        _this.rl = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
        return _this;
    }
    CMenu.prototype.read = function () { };
    CMenu.prototype.executer = function () {
        return 1;
    };
    return CMenu;
}(Table_1.CTable));
exports.CMenu = CMenu;
