import express from "express";

import{
    insertblog,
    updateblog,
    getblog,
    getblogs,
    deleteblog
}from "../controller/blog.js";

const router=express.Router();

router.get("/",getblogs);
router.get("/:id",getblog);
router.post("/",insertblog);
router.put("/:id",updateblog);
router.delete("/:id",deleteblog);

export default router;