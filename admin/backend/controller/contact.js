import {db} from "../db.js";

export const getcontacts=(req,res)=>{
    const query="select * from contact_us";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

export const getcontact=(req,res)=>{
    const query="select * from contact_us where contact_id=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

export const insertcontact=(req,res)=>{
    const query="INSERT INTO `contact_us`(`c_person`, `address`, `email`, `contact_no`, `website_link`, `location_link`, `instagram_link`, `facebook_link`, `youtube_link`, `linkedin_link`, `entry_date`,`entry_by`) VALUES (?)";

    const values=[
        req.body.c_person,
        req.body.address,
        req.body.email,
        req.body.contact_no,
        req.body.website_link,
        req.body.location_link,
        req.body.instagram_link,
        req.body.facebook_link,
        req.body.youtube_link,
        req.body.linkedin_link,
        Date.now(),
        req.body.entry_by
    ]

    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json ("Insert record successfully");
    })
}

export const updatecontact=(req,res)=>{
    const query="UPDATE `contact_us` SET `c_person`=?,`address`=?,`email`=?,`contact_no`=?,`website_link`=?,`location_link`=?,`instagram_link`=?,`facebook_link`=?,`youtube_link`=?,`linkedin_link`=?,`update_date`=?,`entry_by`=? WHERE `contact_id`=?";

    const values=[
        req.body.c_person,
        req.body.address,
        req.body.email,
        req.body.contact_no,
        req.body.website_link,
        req.body.location_link,
        req.body.instagram_link,
        req.body.facebook_link,
        req.body.youtube_link,
        req.body.linkedin_link,
        Date.now(),
        req.body.entry_by
    ]

    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update record successfully");
    })
}

export const deletecontact=(req,res)=>{
    const query="DELETE FROM `contact_us` WHERE contact_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully");
    })
}