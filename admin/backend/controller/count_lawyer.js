import { db } from "../db.js";

export const getcount_lawyer = async(req,res) => {
    const query = "SELECT COUNT(lawyer_id) AS lawyer_id FROM `lawyer`";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}