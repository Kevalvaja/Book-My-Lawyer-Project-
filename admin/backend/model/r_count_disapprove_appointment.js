import express from 'express';

import {
    getcount_disapprove_appointment
}from '../controller/count_disapprove_appointment.js';

const router = express.Router();

router.get("/:id",getcount_disapprove_appointment);

export default router;