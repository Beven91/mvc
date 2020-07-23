"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createParam_1 = __importDefault(require("./createParam"));
function PathVariable(target, name, index) {
    if (arguments.length === 3) {
        return createParam_1.default(target, name, { value: null }, index, 'path', PathVariable);
    }
    else {
        var isString = typeof target === 'string';
        var options_1 = (isString ? { value: target } : target);
        return function (newTarget, newName, newIndex) {
            newIndex = isNaN(newIndex) ? -1 : newIndex;
            return createParam_1.default(newTarget, newName, options_1, newIndex, 'path', PathVariable);
        };
    }
}
exports.default = PathVariable;
//# sourceMappingURL=PathVariable.js.map