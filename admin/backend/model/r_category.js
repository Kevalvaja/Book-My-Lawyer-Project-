import express from 'express';
import {
    getcategories,
    getcategory,
    insertcategory,
    updatecategory,
    deletecategory
}from '../controller/category.js';

const router = express.Router();

router.get("/",getcategories);
router.get("/:id",getcategory);
router.post("/",insertcategory);
router.put("/:id",updatecategory);
router.delete("/:id",deletecategory);

export default router;