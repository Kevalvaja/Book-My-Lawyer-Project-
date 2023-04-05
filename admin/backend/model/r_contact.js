import express from "express";

import{
    insertcontact,
    getcontact,
    getcontacts,
    updatecontact,
    deletecontact
}from "../controller/contact.js";

const router=express.Router();

router.get("/",getcontacts);
router.get("/:id",getcontact);
router.post("/",insertcontact);
router.put("/:id",updatecontact);
router.delete("/:id",deletecontact);

export default router;