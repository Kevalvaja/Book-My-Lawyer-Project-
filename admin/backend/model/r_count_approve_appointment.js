import express from 'express';

import{
    getcount_approve_appointment
}from "../controller/count_approve_appointment.js";

const router = express.Router();

router.get("/:id",getcount_approve_appointment);

export default router;