import express from 'express';

import{
    getcount_category
}from '../controller/count_category.js';

const router = express.Router();

router.get("/",getcount_category);

export default router;