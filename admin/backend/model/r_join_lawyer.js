import express from 'express';

import{
    get_join_lawyer
}from '../controller/join_query_lawyer.js';

const router = express.Router();

router.get("/",get_join_lawyer);

export default router;