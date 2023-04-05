import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";

export default function Add_categories() {
  
  const navigate = useNavigate();
  
  /* Define Back button click event */
  const Display_lawyer_categories = () => {
    navigate("/Display_lawyer_categories")
  }

  /* Define Category Table Field name */
  const [category_name,setCategory_name]=useState('');
  const [category_image1,setCategory_image1]=useState('');
  const [category_image,setCategory_image]=useState('');
  const [description,setDescription]=useState('');
  const [status,setStatus]=useState('');
  
  const [formerror,setFormerror]=useState({})//Define FormError Object

  /* Get Category Id */
  const location = useLocation();
  const categoryId = location.pathname.split("/")[2];

  useEffect(()=>{
    if(categoryId)
    {
      displayCategory();
    }
  },[]);

  //Image Upload Function 
  const upload = async() =>{
    if(category_image!="")
    {
      try{
        const formData = new FormData();
        formData.append("file",category_image);
        const res = await axios.post("http://localhost:8866/backend/upload",formData);
        insertData(res.data);
      }
      catch(err){
        alert(err);
      }
    }
    else
    {
      insertData(category_image1);
    }
  }   

  //Insert Function call
  const insertData = async(category_image) => {
    
    const entry_by=1;
    if(category_name && description && category_image && status && status > 0)
    {
      if(!categoryId)
      {
        try{
        const res = await axios.post("http://localhost:8866/backend/category/",{
          category_name,
          category_image,
          description,
          status,
          entry_by
        })
        alert(res.data);
        navigate("/Display_lawyer_categories")
        } 
        catch(err){
          alert(err);
        }
      }
      else
      {
          try{
            const res = await axios.put("http://localhost:8866/backend/category/" + categoryId,{
              category_name,
              category_image,
              description,
              status,
              entry_by
            })
            alert(res.data);
            navigate("/Display_lawyer_categories")
          }
          catch(err){
            alert(err);
          }
      }
    }
  }

  /* Form Validation Function */
  const validation = () => {
    const error = {};
    if(!category_name)
    {
      error.category_name = "Category name Required"
    }
    if(!description)
    {
      error.description = "Category description Required"
    }
    if(!status || status == 0)
    {
      error.status = "Please select status"
    }
    if(!category_image && !categoryId || !category_image && categoryId)
    {
      if(!category_image && !category_image1 && !categoryId)
      {
        error.category_image = "Image Required";
      }
      else if(!category_image && !category_image1 && categoryId)
      {
        error.category_image = "Image Required";
      }
      else
      {
        upload();
      } 
    }
    return error;
  }

  /* Display Specific Category */
  const displayCategory = async() => {
    try{
      const res = await axios.get("http://localhost:8866/backend/category/" + categoryId)
      setCategory_name(res.data.category_name);
      setCategory_image1(res.data.category_image);
      setDescription(res.data.description);
      setStatus(res.data.status);
    }
    catch(err){
      alert(err);
    }
  }

  /* Add Category */
  const handlesubmit = async(e) => {
    e.preventDefault();
    setFormerror(validation());
    if(category_name && description && category_image && status && status > 0)
    {
      upload();
    }
    
  }

  return (
    <div>
      <main id="main" class="main">
        <div class="col-lg-12" >
            <div class="card">
                <div class="card-body">
                <div class="row">
                {!categoryId? <h2 class="card-title col-6">Add Categories</h2> : <h2 class="card-title col-6">Edit Categories</h2>}
                <div class="col-6">
                  <button type="button" class="btn btn-danger float-end mt-3 rounded-pill" onClick={Display_lawyer_categories}><b>Back</b></button>
                </div>
                </div>
                    <form class="row g-3">
                      <div class="row mt-3">
                        <div class="col-md-6">  
                          <label for="inputEmail3" class="form-label"><b>Lawyer Category Name <span style={{color: 'red'}}>*</span> </b></label>                        
                          <input type="text" class="col-6 form-control" id="inputNanme4" placeholder='Enter Lawyer Category Name' value={category_name} onChange={(e)=>setCategory_name(e.target.value)}/> 
                          <p style={{color: 'red'}}>{formerror.category_name}</p>
                        </div>
                      
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-sm-12">
                                <label class="form-label"><b>Status <span style={{color: 'red'}}>*</span> </b></label>
                                <select class="form-select" aria-label="Default select example" value={status} onChange={e=>setStatus(e.target.value)}>
                                    <option value={0}>-Select-</option>
                                    <option value={1}>Active</option>
                                    <option value={2}>Inactive</option>
                                </select>
                                <p style={{color: 'red'}}>{formerror.status}</p>
                            </div>
                        </div>
                        </div>

                      </div>

                      <div class="row mt-3">
                        
                          <div class="quill-editor-default col-md-6">
                            <label class="form-label"><b>Lawyer Category Description <span style={{color: 'red'}}>*</span> </b></label>
                            <textarea type="text" class="form-control" id="inputNanme4" placeholder='Enter Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>                              
                            <p style={{color: 'red'}}>{formerror.description}</p>
                          </div>                        
                        <div class="col-md-6">
                          <label class="form-label"><b>Add Image <span style={{color: 'red'}}>*</span> </b></label><br></br>
                          <input type="file" class="form-control"  defaultValue={category_image} onChange={(e)=>setCategory_image(e.target.files[0])}/>
                          <p style={{color: 'red'}}>{formerror.category_image}</p>
                          {categoryId && !category_image? <img src={`../upload/${category_image1}`} width={100} height={100} className="float-md-end mt-2" style={{border: "2px solid black"}}></img>
                           :""}
                          {!categoryId && category_image? <img src={URL.createObjectURL(category_image)} width={100} height={100} className="float-md-end mt-2" style={{border: "2px solid black"}}></img>
                           : ""}
                          {categoryId && category_image? <img src={URL.createObjectURL(category_image)} width={100} height={100} className="float-md-end mt-2" style={{border: "2px solid black"}}></img>
                           : ""}
                        </div>

                      </div>

                        <div class="text-center">
                          <button type="submit" class="btn btn-primary rounded-pill" onClick={handlesubmit} style={{ marginRight: "10px" }}><b>Submit</b></button>
                          <button type="reset" class="btn btn-secondary rounded-pill"><b>Reset</b></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </main>
    </div>
  )
}
