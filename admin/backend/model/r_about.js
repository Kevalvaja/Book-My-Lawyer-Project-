import express from "express";

import{
    insertabout,
    updateabout,
    getabout,
    getabouts,
    deleteabout
}from "../controller/about.js";

const router=express.Router();

router.get("/",getabouts);
router.get("/:id",getabout);
router.post("/",insertabout);
router.put("/:id",updateabout);
router.delete("/:id",deleteabout);

export default router;