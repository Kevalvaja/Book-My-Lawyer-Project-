import {db} from "../db.js";

export const getabouts=(req,res)=>{
    const query="select * from about_us";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

export const getabout=(req,res)=>{
    const query="select * from about_us where about_id=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

export const insertabout=(req,res)=>{
    const query="INSERT INTO `about_us`(`description`, `entry_date`, `entry_by`) VALUES (?)";
    const date = new Date();
    const values=[
        req.body.description,
        date,
        req.body.entry_by
    ]
   
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json ("Insert record successfully");
    })
}

export const updateabout=(req,res)=>{
    const query="UPDATE `about_us` SET `description`=?,`update_date`=?,`entry_by`=? WHERE `about_id`=?";
    const date = new Date();
    const values=[
        req.body.description,
        date,
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

export const deleteabout=(req,res)=>{
    const query="DELETE FROM `about_us` WHERE about_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully");
    })
}