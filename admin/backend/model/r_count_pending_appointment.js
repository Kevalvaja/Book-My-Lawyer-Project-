import express from 'express';
import{
    getcount_pending_appointment
}from '../controller/count_pending_appointment.js'

const router = express.Router();

router.get("/:id",getcount_pending_appointment);

export default router;