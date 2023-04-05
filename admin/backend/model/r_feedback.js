import express from "express";

import{
    insertfeedback,
    getfeedback,
    getfeedbacks,
    updatefeedback,
    deletefeedback
}from "../controller/feedback.js";

const router=express.Router();

router.get("/",getfeedbacks);
router.get("/:id",getfeedback);
router.post("/",insertfeedback);
router.put("/:id",updatefeedback);
router.delete("/:id",deletefeedback);

export default router;