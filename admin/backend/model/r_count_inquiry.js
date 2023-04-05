import express from 'express';

import {
    getcount_inquiry,
    getcount_inquiry_lawyer
}from '../controller/count_inquiry.js';

const router = express.Router();

router.get("/",getcount_inquiry);
router.get("/:id",getcount_inquiry_lawyer);

export default router;