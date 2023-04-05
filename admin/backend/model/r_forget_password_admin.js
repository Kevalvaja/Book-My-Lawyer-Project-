import express from 'express';

import {
    getadmin_forget_password
} from '../controller/forget_password_admin.js';

const router = express.Router();

router.get("/",getadmin_forget_password);

export default router;