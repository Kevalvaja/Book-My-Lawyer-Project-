import express from 'express';

import{
    getlawyer_blog
} from '../controller/lawyer_blog.js';

const router = express.Router();

router.get("/:id",getlawyer_blog);

export default router;