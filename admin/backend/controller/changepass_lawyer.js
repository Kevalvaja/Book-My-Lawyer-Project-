import { db } from "../db.js";


//Admin Update Query
export const updatepassword = (req,res) => {
    const query = "UPDATE `lawyer` SET `password`=?,`update_date`=?,`entry_by`=? WHERE `lawyer_id`=?";
    const date = new Date();
    const values = [
        req.body.password,
        date,
        req.body.entry_by
    ]

    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Change Your Password Successfully");
    })
}
