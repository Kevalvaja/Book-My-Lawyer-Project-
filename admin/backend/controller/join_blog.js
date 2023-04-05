import {db} from "../db.js";

export const getblogs=(req,res)=>{
    const query="SELECT a.*,b.name from blog a,lawyer b where a.lawyer_id=b.lawyer_id";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}