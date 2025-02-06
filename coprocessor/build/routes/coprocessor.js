"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const coprocessor_1 = __importDefault(require("../controllers/coprocessor"));
const router = express_1.default.Router();
router.get("/", coprocessor_1.default.getCoprocessor);
router.post("/", coprocessor_1.default.postCoprocessor);
module.exports = router;
