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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const examples_1 = __importDefault(require("../examples"));
(0, dotenv_1.config)();
const exampleText = process.env.EXAMPLE || "defaultExample";
const getCoprocessor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        message: "Successfully Queried coprocessor",
    });
});
const postCoprocessor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    let chosenExample = examples_1.default[exampleText];
    // Catch all incase env variable doesn't match existing example
    if (!chosenExample)
        chosenExample = examples_1.default["defaultExample"];
    // return response
    return res.status(200).json(chosenExample(req.body));
});
exports.default = { getCoprocessor, postCoprocessor };
