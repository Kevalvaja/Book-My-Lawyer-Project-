import {db} from "../db.js";

export const getclients=(req,res)=>{
    const query="select *,DATE_FORMAT(dob, '%d-%m-%Y') as dob from client";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

export const getclient=(req,res)=>{
    const query="select *,DATE_FORMAT(dob, '%d-%m-%Y') as dob from client where client_id=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

export const insertclient=(req,res)=>{
    const query="INSERT INTO `client`(`client_name`, `mobile_no`, `email`, `password`, `dob`, `age`, `address`, `city`, `country`, `status`, `entry_date`, `entry_by`) VALUES (?)";
    const date = new Date();
    const values=[
        req.body.client_name,
        req.body.mobile_no,
        req.body.email,
        req.body.password,
        req.body.dob,
        req.body.age,
        req.body.address,
        req.body.city,
        req.body.country,
        req.body.status,
        date,
        req.body.entry_by
    ]
    // console.log(values);
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json ("Insert record successfully");
    })
}

export const updateclient=(req,res)=>{
    const query="UPDATE `client` SET `client_name`=?,`mobile_no`=?,`email`=?,`password`=?,`dob`=?,`age`=?,`address`=?,`city`=?,`country`=?,`status`=?,`update_date`=?,`entry_by`=? WHERE `client_id`=?";
    const date = new Date();
    const values=[
        req.body.client_name,
        req.body.mobile_no,
        req.body.email,
        req.body.password,
        req.body.dob,
        req.body.age,
        req.body.address,
        req.body.city,
        req.body.country,
        req.body.status,
        date,
        req.body.entry_by
    ]

    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update record successfully");
    })
}

export const deleteclient=(req,res)=>{
    const query="DELETE FROM `client` WHERE client_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully");
    })
}