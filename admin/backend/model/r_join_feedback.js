import express from "express";

import{
    getfeedbacks
}from "../controller/join_feedback.js";

const router=express.Router();

router.get("/",getfeedbacks);

export default router;