import {db} from "../db.js";

export const getclientappointments=(req,res)=>{
   //const query="select a.*,b.name,c.client_name from  client_appointment a,lawyer b,client c where a.appointment_id=b.lawyer_id  and   a.appointment_id=c.client_id";
    const query="select * from client_appointment";
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

export const getclientappointment=(req,res)=>{
    const query="select *,DATE_FORMAT(appointment_date, '%Y-%m-%d') as appointment_date from client_appointment where appointment_id=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

export const insertclientappointment=(req,res)=>{
    const query="INSERT INTO `client_appointment`(`client_id`, `lawyer_id`, `appointment_title`, `appointment_date`, `message`, `gender`,`status`, `entry_date`,`entry_by`, `category_id`,`case_status`) VALUES (?)";
    const date = new Date();
    const values=[
        req.body.client_id,
        req.body.lawyer_id,
        req.body.appointment_title,
        req.body.appointment_date,
        req.body.message,
        req.body.gender,
        req.body.status,
        date,
        req.body.entry_by,
        req.body.category_id,
        req.body.case_status
    ]
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json ("Insert record successfully");
    })
}

export const updateclientapoointment=(req,res)=>{
    const query="UPDATE `client_appointment` SET `client_id`=?,`lawyer_id`=?,`appointment_title`=?,`appointment_date`=?,`message`=?,`gender`=?,`status`=?,`update_date`=?,`entry_by`=?,`category_id`=?,`case_status`=? WHERE `appointment_id`=?";
    const date = new Date();
    const values=[
        req.body.client_id,
        req.body.lawyer_id,
        req.body.appointment_title,
        req.body.appointment_date,
        req.body.message,
        req.body.gender,
        req.body.status,
        date,
        req.body.entry_by,
        req.body.category_id,
        req.body.case_status
    ]
    // console.log(values);
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update record successfully");
    })
}

export const deleteclientappointment=(req,res)=>{
    const query="DELETE FROM `client_appointment` WHERE appointment_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully");
    })
}