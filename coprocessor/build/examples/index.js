"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const policyVersioning_1 = __importDefault(require("./policyVersioning"));
const defaultExample_1 = __importDefault(require("./defaultExample"));
exports.default = {
    defaultExample: defaultExample_1.default,
    policyVersioning: policyVersioning_1.default,
};
