import express from "express";

import{
    updateclientapoointment
}from "../controller/client_appointment_status.js";

const router=express.Router();

router.put("/:id",updateclientapoointment);

export default router;