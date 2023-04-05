import express from 'express';

import{
    getlawyer_login
}from "../controller/lawyer_login.js";

const router = express.Router();

router.get("/",getlawyer_login);

export default router;