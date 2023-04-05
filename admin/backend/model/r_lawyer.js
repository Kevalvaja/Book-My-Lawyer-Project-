import e from 'express';
import express from 'express';
import{
    getlawyers,
    getlawyer,
    insertlawyer,
    updatelawyer,
    deletelawyer
}from '../controller/lawyer.js';

const router = express.Router();

router.get("/",getlawyers);
router.get("/:id",getlawyer);
router.post("/",insertlawyer);
router.put("/:id",updatelawyer);
router.delete("/:id",deletelawyer);

export default router;