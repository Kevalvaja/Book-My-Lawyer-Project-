import {db} from '../db.js';

export const getcount_feedback = (req,res) => {
    const query = "SELECT COUNT(feedback_id) AS feedback_id FROM `feedback`";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}