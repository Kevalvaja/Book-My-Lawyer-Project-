import { db } from "../db.js";


//Admin Update Query
export const updatepassword = (req,res) => {
    const query = "UPDATE `admin` SET `password`=?,`update_date`=?,`entry_by`=? WHERE `admin_id`=?";
    const date = new Date();
    const values = [
        req.body.password,
        date,
        req.body.entry_by
    ]
    // console.log(values)
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Change Your Password Successfully");
    })
}
