import express from "express";

import{
        getclientappointments,
        getclientappointments_lawyer
}from "../controller/join_client_appoitment.js";

const router=express.Router();

router.get("/",getclientappointments);
router.get("/:id",getclientappointments_lawyer);

export default router;