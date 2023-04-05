import {db} from '../db.js';

export const get_join_lawyer = (req,res) => {
    const query = "select a.*,DATE_FORMAT(a.dob, '%d-%m-%Y') as dob2,b.category_name from lawyer a,categories b where a.category_id=b.category_id";
    
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}