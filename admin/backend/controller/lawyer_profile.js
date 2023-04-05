import { db } from '../db.js';

//Update Lawyer Profile Query
export const updatelawyer_profile = (req,res) => {
    const query = "UPDATE `lawyer` SET `name`=?,`image`=?,`mobile_no`=?,`mobile_no2`=?,`email`=?,`email2`=?,`age`=?,`dob`=?,`address`=?,`city`=?,`state`=?,`update_date`=?,`entry_by`=? WHERE `lawyer_id`=?";
    const date = new Date();
    const values = [
        req.body.name,
        req.body.image,
        req.body.mobile_no,
        req.body.mobile_no2,
        req.body.email,
        req.body.email2,
        req.body.age,
        req.body.dob,
        req.body.address,
        req.body.city,
        req.body.state,
        date,
        req.body.entry_by
    ]
    // console.log(values);
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update record successfully")
    })
}