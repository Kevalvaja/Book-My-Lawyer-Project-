import express from "express";

import{
    insertclientappointment,
    getclientappointment,
    getclientappointments,
    updateclientapoointment,
    deleteclientappointment
}from "../controller/client_apoointment.js";

const router=express.Router();

router.get("/",getclientappointments);
router.get("/:id",getclientappointment);
router.post("/",insertclientappointment);
router.put("/:id",updateclientapoointment);
router.delete("/:id",deleteclientappointment);

export default router;