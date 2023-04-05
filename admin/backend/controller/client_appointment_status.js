import { db } from "../db.js";

export const updateclientapoointment=(req,res)=>{
    const query="UPDATE `client_appointment` SET `update_date`=?,`entry_by`=?,`case_status`=? WHERE `appointment_id`=?";
    const date = new Date();
    const values=[
        date,
        req.body.entry_by,
        req.body.case_status
    ]
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update record successfully");
    })
}