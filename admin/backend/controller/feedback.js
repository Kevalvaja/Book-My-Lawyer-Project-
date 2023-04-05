import {db} from "../db.js";

export const getfeedbacks=(req,res)=>{
    const query="select * from feedback";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

export const getfeedback=(req,res)=>{
    const query="select * from feedback where feedback_id=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

export const insertfeedback=(req,res)=>{
    const query="INSERT INTO `feedback`(`client_id`, `feedback_title`, `message`, `status`, `entry_date`, `entry_by`) VALUES (?)";

    const values=[
        req.body.client_id,
        req.body.feedback_title,
        req.body.message,
        req.body.status,
        Date.now(),
        req.body.entry_by
    ]
   
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json ("Insert record successfully");
    })
}

export const updatefeedback=(req,res)=>{
    const query="UPDATE `feedback` SET `client_id`=?,`feedback_title`=?,`message`=?,`status`=?,`entry_by`=? WHERE `feedback_id`=?";
    const values=[
        req.body.client_id,
        req.body.feedback_title,
        req.body.message,
        req.body.status,
        req.body.entry_by
    ]
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) 
        {
            console.log(err)
            return res.json(err);
        }
        
        return res.json("Update record successfully");
    })
}

export const deletefeedback=(req,res)=>{
    const query="DELETE FROM `feedback` WHERE feedback_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully");
    })
}