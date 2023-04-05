import express from 'express';
import{
    getcount_client
}from '../controller/count_client.js';

const router = express.Router();

router.get("/",getcount_client);

export default router;