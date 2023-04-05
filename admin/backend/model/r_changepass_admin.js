import express from "express";

import{
    updatepassword
}from "../controller/changepass_admin.js";

const router=express.Router();


router.put("/:id",updatepassword);


export default router;