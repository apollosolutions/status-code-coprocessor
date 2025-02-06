"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const coprocessor_1 = __importDefault(require("./routes/coprocessor"));
const router = (0, express_1.default)();
/** Logging */
router.use((0, morgan_1.default)("dev"));
router.use(express_1.default.urlencoded({ extended: false }));
router.use(express_1.default.json());
/** RULES */
router.use((req, res, next) => {
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // set the CORS headers
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    // set the CORS method headers
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST");
        return res.status(200).json({});
    }
    next();
});
/** Add Routes */
router.use("/", coprocessor_1.default);
/** Server */
const httpsServer = http.createServer(router);
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8081;
httpsServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
