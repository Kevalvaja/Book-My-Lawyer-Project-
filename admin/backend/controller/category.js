import {db} from '../db.js';

// Display All Categories
export const getcategories = (req,res) => {
    const query = "SELECT * FROM `categories`";
   //const query = " SELECT *, status,CASE WHEN status == 1  THEN Active ELSE Inactive END FROM categories";

    db.query(query,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
}

//Display Specific Category Query
export const getcategory = (req,res) => {
    const query = "SELECT * FROM `categories` WHERE `category_id`=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    })
}

//Insert Category Query
export const insertcategory = (req,res) => {
    const query = "INSERT INTO `categories`(`category_name`, `category_image`, `description`, `status`, `entry_date`, `entry_by`) VALUES (?)";
    const date = new Date();
    const values = [
        req.body.category_name,
        req.body.category_image,
        req.body.description,
        req.body.status,
        date,
        req.body.entry_by
    ]
   
    db.query(query,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Insert data successfully");
    })
}

//Update Category Query
export const updatecategory = (req,res) => {
    const query = "UPDATE `categories` SET `category_name`=?,`category_image`=?,`description`=?,`status`=?,`update_date`=?,`entry_by`=? WHERE `category_id`=?";
    const date = new Date();
    const values = [
        req.body.category_name,
        req.body.category_image,
        req.body.description,
        req.body.status,
        date,
        req.body.entry_by
    ]
    db.query(query,[...values,req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Update data successfully");
    })

}

//Delete Category Query
export const deletecategory = (req,res) => {
    const query = "DELETE FROM `categories` WHERE `category_id`=?";

    db.query(query,[req.params.id],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Delete data successfully");
    })
}