import { db } from "../db.js";

//Display All Inquiry Query
export const getinquirys = (req,res) => {
    const query = "SELECT * FROM `inquiry`";
    //const query = "SELECT a.*,b.name,c.client_name FROM inquiry a LEFT JOIN lawyer b ON a.lawyer_id = b.lawyer_id  LEFT JOIN client c ON a.client_id=c.client_id";
    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

//Display Specific Inquiry Query
export const getinquiry = (req,res) => {
    const query = "SELECT a.*,b.name,c.client_name FROM inquiry a LEFT JOIN lawyer b ON a.lawyer_id = b.lawyer_id  LEFT JOIN client c ON a.client_id=c.client_id WHERE inquiry_id=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

//Insert Inquiry Query
export const insertinquiry = (req,res) => {
    const query = "INSERT INTO `inquiry`(`client_id`, `lawyer_id`, `inquiry_title`, `inquiry_date`, `message`, `replay_inquiry`, `display_inquiry`, `status`, `entry_date`, `entry_by`) VALUES (?)";
    const date = new Date();
    const values = [
        req.body.client_id,
        req.body.lawyer_id,
        req.body.inquiry_title,
        req.body.inquiry_date,
        req.body.message,
        req.body.replay_inquiry,
        req.body.display_inquiry,
        req.body.status,
        date,
        req.body.entry_by
    ]

    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Insert record successfully")
    })
}

//Update Inquiry Query
export const updateinquiry = (req,res) => {
    const query = "UPDATE `inquiry` SET `replay_inquiry`=?,`update_date`=?,`entry_by`=? WHERE `inquiry_id`=?";
    const date = new Date();
    const values = [
        req.body.replay_inquiry,
        date,
        req.body.entry_by
    ]
    // console.log(values);
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Your Inquiry send successfully")
    })
}

//Delete Inquiry Query
export const deleteinquiry = (req,res) => {
    const query = "DELETE FROM `inquiry` WHERE `inquiry_id`=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete record successfully")
    })
}