import express from 'express';
import{
    postInquiry_lawyer,
    getinquiry_lawyer,
    putInquiry_lawyer
}from '../controller/add_inquiry_lawyer.js';

const router = express.Router();

router.post("/",postInquiry_lawyer);
router.get("/:id",getinquiry_lawyer);
router.put("/:id",putInquiry_lawyer);

export default router;