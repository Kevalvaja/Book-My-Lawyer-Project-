import {db} from "../db.js";

export const getclientappointments=(req,res)=>{
   const query="SELECT a.*,DATE_FORMAT(appointment_date, '%d-%m-%Y') as appointment_date2,b.name,c.client_name FROM `client_appointment` a, lawyer b,client c WHERE a.lawyer_id=b.lawyer_id AND a.client_id=c.client_id";
    
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

export const getclientappointments_lawyer=(req,res)=>{
    const query="SELECT a.*,DATE_FORMAT(appointment_date, '%d-%m-%Y') as appointment_date2,b.name,c.client_name,d.category_name FROM `client_appointment` a, lawyer b,client c,categories d WHERE a.lawyer_id=b.lawyer_id AND a.client_id=c.client_id AND a.category_id=d.category_id AND a.lawyer_id=?";
     
     db.query(query,req.params.id,(err,data)=>{
         if(err) return res.json(err);
         return res.json(data);
     })
 }