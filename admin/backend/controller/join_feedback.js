import {db} from "../db.js";

export const getfeedbacks=(req,res)=>{
    const query = "select a.*,b.client_name from feedback a,client b where a.client_id=b.client_id";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}