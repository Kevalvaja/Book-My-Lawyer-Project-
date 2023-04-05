import { db } from "../db.js";

export const getcount_approve_appointment = (req,res) => {
    const query = "SELECT COUNT(case_status) AS case_status FROM `client_appointment` WHERE lawyer_id=? AND case_status=2";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    });
}