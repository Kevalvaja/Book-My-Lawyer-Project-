import express from 'express';

import{
    getcount_blog,
    getcount_blog_lawyer
}from '../controller/count_blog.js';

const router = express.Router();

router.get("/",getcount_blog);
router.get("/:id",getcount_blog_lawyer);

export default router;