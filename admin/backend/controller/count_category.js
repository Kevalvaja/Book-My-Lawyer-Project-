import { db } from "../db.js";

export const getcount_category = async(req,res) => {
    const query = "SELECT COUNT(category_id) AS category_id FROM `categories`";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}