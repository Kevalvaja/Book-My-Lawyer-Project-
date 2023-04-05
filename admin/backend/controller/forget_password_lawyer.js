import { db } from "../db.js";

export const getforget_password = (req,res) => {
    const email = req.query.email;

    const query = "SELECT * FROM `lawyer` WHERE email='" + email + "'";

    try{
        db.query(query,(err,data)=>{
            if(err) return res.json(err);
            else
            {
                if(data.length == 0)
                    return res.json(0);
                else
                    return res.json(data[0].lawyer_id);
            }
        })
    }
    catch(err){
        console.log(err);
    } 
}