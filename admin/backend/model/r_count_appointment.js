import express from 'express';

import{
    getcount_appointment,
    getcount_appointment_lawyer
}from '../controller/count_appointment.js';

const router = express.Router();

router.get("/",getcount_appointment);
router.get("/:id",getcount_appointment_lawyer);


export default router;