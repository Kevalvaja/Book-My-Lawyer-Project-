import express from 'express';
import { 
    getLogin 
}from '../controller/login.js';

const router = express.Router();

router.get("/",getLogin);

export default router;