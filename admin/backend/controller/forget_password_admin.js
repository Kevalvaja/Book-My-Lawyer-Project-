import { db } from '../db.js';

export const getadmin_forget_password = (req,res) => {
    const email = req.query.email;

    const query = "SELECT * from `admin` WHERE email='" + email + "'";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        else
        {
            if(data.length == 0)
                return res.json(0);
            else
                return res.json(data[0].admin_id)
        }
    })
}