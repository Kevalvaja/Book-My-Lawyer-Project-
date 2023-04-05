import express from 'express';

import {
    updatelawyer_profile
} from '../controller/lawyer_profile.js';

const router = express.Router();

router.put("/:id",updatelawyer_profile);

export default router