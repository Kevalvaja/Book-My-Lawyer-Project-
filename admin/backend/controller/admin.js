import { db } from "../db.js";

/* System Date */
const now = new Date();
console.log(now);

// Admin Display Query
export const getadmins = (req,res) => {
    const query = "SELECT * FROM `admin`";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

// Admin Display Query and pass Admin_id
export const getadmin = (req,res) => {
    const query = "SELECT * FROM `admin` WHERE `admin_id`=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

// Admin Insert Query
export const insertadmin = (req,res) => {
    const query = "INSERT INTO `admin`(`admin_name`, `email`, `mobile_no`, `password`, `status`, `entry_date`, `entry_by`) VALUES (?)";
    const date = new Date();
    const values = [
        req.body.admin_name,
        req.body.email,
        req.body.mobile_no,
        req.body.password,
        req.body.status,
        date,
        req.body.entry_by
    ]

    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Insert admin successfully");
    })
}

//Admin Update Query
export const updateadmin = (req,res) => {
    const query = "UPDATE `admin` SET `admin_name`=?,`email`=?,`mobile_no`=?,`update_date`=?,`entry_by`=?,`admin_image`=? WHERE `admin_id`=?";
    const date = new Date();
    const values = [
        req.body.admin_name,
        req.body.email,
        req.body.mobile_no,
        date,
        req.body.entry_by,
        req.body.admin_image
    ]

    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update record successfully");
    })
}

// Admin Delete Query
export const deleteadmin = (req,res) => {
    const query = "DELETE FROM `admin` WHERE `admin_id`=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully");
    })
}