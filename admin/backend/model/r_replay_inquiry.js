import express from 'express';
import {
    getinquirys,
    getinquiry,
    insertinquiry,
    updateinquiry,
    deleteinquiry
}from '../controller/replay_inquiry.js';

const router = express.Router();

router.get("/",getinquirys);
router.get("/:id",getinquiry);
router.post("/",insertinquiry);
router.put("/:id",updateinquiry);
router.delete("/:id",deleteinquiry);

export default router;