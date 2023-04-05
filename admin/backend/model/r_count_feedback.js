import express from 'express';

import{
    getcount_feedback
}from '../controller/count_feedback.js';

const router = express.Router();

router.get("/",getcount_feedback);

export default router;