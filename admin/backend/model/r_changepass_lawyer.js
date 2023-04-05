import express from "express";

import{
    updatepassword
}from "../controller/changepass_lawyer.js";

const router=express.Router();


router.put("/:id",updatepassword);


export default router;