import express from "express";

import{
    insertclient,
    getclient,
    getclients,
    updateclient,
    deleteclient
}from "../controller/client.js";

const router=express.Router();

router.get("/",getclients);
router.get("/:id",getclient);
router.post("/",insertclient);
router.put("/:id",updateclient);
router.delete("/:id",deleteclient);

export default router;