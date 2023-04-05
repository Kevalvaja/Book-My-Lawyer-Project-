import { db } from "../db.js";

export const getcount_inquiry = async(req,res) => {
    const query = "SELECT COUNT(inquiry_id) AS inquiry_id FROM `inquiry`";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

export const getcount_inquiry_lawyer = async(req,res) => {
    const query = "SELECT COUNT(inquiry_id) AS inquiry_id FROM `inquiry` WHERE lawyer_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}