import express from "express";
import controller from "../controllers/coprocessor";
const router = express.Router();

router.get("/", controller.getCoprocessor);
router.post("/", controller.postCoprocessor);

export = router;
