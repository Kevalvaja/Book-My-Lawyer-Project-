import { db } from "../db.js";

//Display All Lawyer Query
export const getlawyers = (req,res) => {
    //const query = "SELECT a.*, b.c_name FROM lawyer a LEFT JOIN categories b ON a.category_id = b.category_id";
    //const query = "select a.*,b.c_name from lawyer a,categories b where a.category_id=b.category_id";
    const query = "SELECT * FROM lawyer";
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

//Display Specific Lawyer Query
export const getlawyer = (req,res) => {
    const query = "SELECT *,DATE_FORMAT(dob, '%d-%m-%Y') as dob FROM `lawyer` WHERE `lawyer_id`=?";

    db.query(query,[req.params.id],(err,data)=>{
        // console.log(data[0])
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

//Insert Lawyer Query
export const insertlawyer = (req,res) => {
    const query = "INSERT INTO `lawyer`(`category_id`, `name`, `image`, `mobile_no`, `mobile_no2`, `email`, `email2`, `age`, `dob`, `address`, `city`, `state`, `country`, `password`, `status`, `entry_date`, `entry_by`) VALUES (?)";

    const date = new Date();

    const values = [
        req.body.category_id,
        req.body.name,
        req.body.image,
        req.body.mobile_no,
        req.body.mobile_no2,
        req.body.email,
        req.body.email2,
        req.body.age,
        req.body.dob,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.country,
        req.body.password,
        req.body.status,
        date,
        req.body.entry_by
    ]

    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Insert record successfully");
    })
}

//Update Lawyer Query
export const updatelawyer = (req,res) => {
    const query = "UPDATE `lawyer` SET `category_id`=?, `name`=?,`image`=?,`mobile_no`=?,`mobile_no2`=?,`email`=?,`email2`=?,`age`=?,`dob`=?,`address`=?,`city`=?,`state`=?,`country`=?,`password`=?,`status`=?,`update_date`=?,`entry_by`=? WHERE `lawyer_id`=?";
    const date = new Date();
    const values = [
        req.body.category_id,
        req.body.name,
        req.body.image,
        req.body.mobile_no,
        req.body.mobile_no2,
        req.body.email,
        req.body.email2,
        req.body.age,
        req.body.dob,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.country,
        req.body.password,
        req.body.status,
        date,
        req.body.entry_by
    ]
    
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update record successfully")
    })
}

//Delete Lawyer Query
export const deletelawyer = (req,res) => {
    const query = "DELETE FROM `lawyer` WHERE `lawyer_id`=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully");
    })
}