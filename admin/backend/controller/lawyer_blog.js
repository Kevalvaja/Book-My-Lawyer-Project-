import { db } from "../db.js";

export const getlawyer_blog = (req,res) => {
    const query = "SELECT a.*,b.name from blog a,lawyer b where a.lawyer_id=b.lawyer_id and a.lawyer_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}