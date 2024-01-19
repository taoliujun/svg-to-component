"use strict";
//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentsPath = exports.packagePath = void 0;
const path_1 = __importDefault(require("path"));
const packagePath = path_1.default.resolve(__dirname, '../..');
exports.packagePath = packagePath;
const sourcePath = path_1.default.join(packagePath, './src');
const componentsPath = path_1.default.resolve(sourcePath, './svgComponents');
exports.componentsPath = componentsPath;
