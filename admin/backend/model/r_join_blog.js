import express from "express";

import{
    getblogs
}from "../controller/join_blog.js";

const router=express.Router();

router.get("/",getblogs);

export default router;