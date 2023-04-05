import express from 'express';
import{
    getforget_password
}from '../controller/forget_password_lawyer.js';

const router = express.Router();

router.get("/",getforget_password);

export default router;