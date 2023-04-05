import {db} from "../db.js";

export const getblogs=(req,res)=>{
    const query="SELECT * FROM `blog`";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

export const getblog=(req,res)=>{
    const query="select * from blog where blog_id=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

export const insertblog=(req,res)=>{
    const query="INSERT INTO `blog`(`lawyer_id`,`blog_image`, `blog_title`, `blog_desc`, `status`, `entry_date`, `entry_by`) VALUES (?)";
  
    const values=[
        req.body.lawyer_id,
        req.body.blog_image,
        req.body.blog_title,
        req.body.blog_desc,
        req.body.status,
        Date.now(),
        req.body.entry_by
    ]
    
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json ("Insert record successfully");
    })
}

export const updateblog=(req,res)=>{
    const query="UPDATE `blog` SET `lawyer_id`=?, `blog_image`=?,`blog_title`=?,`blog_desc`=?,`status`=?,`update_date`=?,`entry_by`=? WHERE `blog_id`=?";

    const values=[
        req.body.lawyer_id,
        req.body.blog_image,
        req.body.blog_title,
        req.body.blog_desc,
        req.body.status,
        Date.now(),
        req.body.entry_by,
    ]
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update record successfully");
    })
}

export const deleteblog=(req,res)=>{
    const query="DELETE FROM `blog` WHERE blog_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully");
    })
}