import {db} from '../db.js';

export const getcount_client = (req,res) => {
    const query = "SELECT COUNT(client_id) AS client_id FROM `client`";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}