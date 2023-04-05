import {db} from '../db.js';

export const getlawyer_login = (req,res) =>{
    const mobile_no = req.query.mobile_no;
    const password = req.query.password;

    const query = "SELECT * FROM `lawyer` WHERE mobile_no='" + mobile_no + "' AND password='" + password + "'";

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
        // console.log(res.data);
    }
    catch(err){
        console.log(err);
    }
}