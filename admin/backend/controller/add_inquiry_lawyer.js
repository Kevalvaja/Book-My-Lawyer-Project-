import { db } from "../db.js";

export const postInquiry_lawyer = (req,res) => {
    const query = "INSERT INTO `inquiry`(`lawyer_id`, `inquiry_title`, `inquiry_date`, `message`, `status`, `entry_date`, `entry_by`) VALUES (?)";
    const date = new Date();
    const status = 1;
    const values = [ 
        req.body.lawyer_id,
        req.body.inquiry_title,
        date,
        req.body.message,
        status,
        date,
        req.body.entry_by
    ]
    
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Your Inquiry Send Successfully");
    })

}

export const getinquiry_lawyer = (req,res) => {
    const query = "SELECT a.*,DATE_FORMAT(a.inquiry_date, '%d-%m-%Y') as inquiry_date,DATE_FORMAT(a.update_date, '%d-%m-%Y') as update_date,b.name FROM `inquiry` a,`lawyer` b WHERE a.lawyer_id = b.lawyer_id AND a.client_id=0 AND a.lawyer_id=?";

    db.query(query,req.params.id,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
}

export const putInquiry_lawyer = (req,res) => {
    const query = "UPDATE `inquiry` SET `inquiry_title`=?,`message`=?,`entry_date`=?,`entry_by`=? WHERE `inquiry_id`=?";
     const date = new Date();
    const values = [
        req.body.inquiry_title,
        req.body.message,
        date,
        req.body.entry_by
    ]
    console.log(values);
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update Your Inquiry Successfully");
    })

}