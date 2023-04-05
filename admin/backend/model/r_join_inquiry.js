import express from 'express';

import{
    get_join_inquiry,
    get_join_inquiry_lawyer
}from '../controller/join_query_inquiry.js';

const router = express.Router();

router.get("/",get_join_inquiry);
router.get("/:id",get_join_inquiry_lawyer);

export default router;