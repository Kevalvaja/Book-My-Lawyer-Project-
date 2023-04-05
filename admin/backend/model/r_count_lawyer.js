import express from 'express';

import{
    getcount_lawyer
}from '../controller/count_lawyer.js';

const router = express.Router();

router.get("/",getcount_lawyer);

export default router;