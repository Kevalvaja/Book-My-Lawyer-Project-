import express from 'express';

import {
    getadmins,
    getadmin,
    insertadmin,
    updateadmin,
    deleteadmin
}from '../controller/admin.js';

const router = express.Router();

router.get("/",getadmins);
router.get("/:id",getadmin);
router.post("/",insertadmin);
router.put("/:id",updateadmin);
router.delete("/:id",deleteadmin);

export default router;