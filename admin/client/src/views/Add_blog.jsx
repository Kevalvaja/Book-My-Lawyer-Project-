import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Add_blog() {
      const id = sessionStorage.getItem("user");
      const role = sessionStorage.getItem("role");
      const[l_name,setLtype]=useState([]);

      const[blog_image1,setImage]=useState('');
      const[blog_image2,setImage2]=useState('');
      const[blog_title,setTitle]=useState('');
      const[blog_desc,setDescription]=useState('');
      const[status,setStatus]=useState('');
      const[lawyer_id,setLawyerid]=useState('');
      const [name,setLawyer_name] = useState('');
      const[formErrors,setFormErrors]=useState({});

      const location=useLocation();
      const blogid=location.pathname.split("/")[2] ? location.pathname.split("/")[2]:"";


      useEffect(()=>{
            selected();
          //  if(blogid)
            fatchblog(); 
            if(id)
            {
                  lawyer_name();
            }
      },[]);


      const navigate=useNavigate();


      const fatchblog=async()=>{
        try
        {
            
                const res=await axios.get("http://localhost:8866/backend/blog/"+blogid);
                setImage2(res.data.blog_image);
              //setImage(res.data.blog_image);
                setTitle(res.data.blog_title);
                setDescription(res.data.blog_desc);
                setStatus(res.data.status);
                setLawyerid(res.data.lawyer_id);
        }
        catch(err)
        {
                alert(err);
        }
      }



      const upload = async() => {
        if(blog_image1!="")
        {
          try
          {
                  const formData = new FormData();
                  formData.append("file",blog_image1);
                  const res = await axios.post("http://localhost:8866/backend/upload",formData);
                  insertData(res.data);
          }
          catch(err)
          {
                  alert(err);
          }
        }
        else
        {
                  insertData(blog_image2);
        }
      }


  const insertData = async(blog_image) =>{
   
    const entry_by=id;
//     let res="";
    try
    {
      if(role == 1)
      {
            if(blogid)
            {
                  const res = await axios.put("http://localhost:8866/backend/blog/" + blogid ,{
                        blog_image,
                        lawyer_id,
                        blog_title,
                        blog_desc,
                        status,
                        entry_by
                  });      
                  alert(res.data);
                  navigate("/Display_blog")                  
            }
            else
            {
                  const res = await axios.post("http://localhost:8866/backend/blog",{
                        blog_image,
                        lawyer_id,
                        blog_title,
                        blog_desc,
                        status,
                        entry_by
                  });      
                  alert(res.data);
                  navigate("/Display_blog")
            }
      }
      else
      {
            let lawyer_id = id;
            if(blogid)
            {
                  const res = await axios.put("http://localhost:8866/backend/blog/" + blogid ,{
                        blog_image,
                        lawyer_id,
                        blog_title,
                        blog_desc,
                        status,
                        entry_by
                  });      
                  alert(res.data);
                  navigate("/Display_blog")                  
            }
            else
            {
                  const res = await axios.post("http://localhost:8866/backend/blog",{
                        blog_image,
                        lawyer_id,
                        blog_title,
                        blog_desc,
                        status,
                        entry_by
                  });      
                  alert(res.data);
                  navigate("/Display_blog")
            }
      }
      
    }
    catch(err)
    {
          alert(err);
    }
  }

  
  const validate=()=>{
    const errors={};
    if(!blog_image1 && !blogid)
    {
      errors.blog_image1="Please Select Image";
    }
    if(!blog_title)
    {
      errors.blog_title="Please Enter Title";
    }
    if(!blog_desc)
    {
      errors.blog_desc="Please Enter Description";
    }
    if(!status)
    {
      errors.status="Please Select Status";
    }
    if(role==1 && !lawyer_id)
    {
      errors.lawyer_id="Please Select Lawyer"
    }
    return errors;
  }

  

  const submithandle=async(e)=>{
        e.preventDefault();
        setFormErrors(validate());

        if(!blogid)
        {
            if((blog_image1) && blog_title && blog_desc && status)
            {
                  if(role == 2 && !lawyer_id || role == 1 && lawyer_id)
                  {
                        upload();
                  }
            }
        }
        if(blogid)
        {
            if(blog_title && blog_desc && status)
            {
                  if(role == 2 && !lawyer_id || role == 1 && lawyer_id)
                  {
                        upload();
                  }
            }
        }
        
  }

  
  const Display_blog = ()=>{
          navigate("/Display_blog");
  }


  const selected = async() => {
      try{
            const res = await axios.get("http://localhost:8866/backend/lawyer");
            setLtype(res.data);
      }
      catch(err){
            alert(err);
      }
  }

  const lawyer_name = async() => {
      try{
            const res = await axios.get("http://localhost:8866/backend/lawyer/"+id);
            setLawyer_name(res.data.name);
      }
      catch(err){
            alert(err);
      }
  }

  return (
    <div>
        <main id="main" class="main">
            <div class="col-lg-12"> 
                <div class="card">
                    <div class="card-body row">
                        {!blogid ? <h5 class="card-title col-6">Add Blog</h5> : <h5 class="card-title col-6">Edit Blog</h5> }

                        <div class="col-6 mt-3">
                              <button type='button' class="btn btn-danger rounded-pill float-end" onClick={Display_blog}><b>Back</b></button>
                        </div>

                        <form class="row">
                              <div class="row">
                                    <div class="col-12">
                                          {blogid && !blog_image1? <img src={`../upload/${blog_image2}`} width={100} height={100} class="float-md-end mb-3" style={{border:'2px solid black'}}></img> : ""}
                                          {!blogid && blog_image1? <img src={URL.createObjectURL(blog_image1)} width={100} height={100} style={{marginBottom:'10px',border:'2px solid black'}} class="float-md-end"></img> : ""}
                                          {blogid && blog_image1? <img src={URL.createObjectURL(blog_image1)} width={100} height={100} class="float-md-end" style={{border:'2px solid black'}}></img> : ""}
                                          {/* {!blog_image1 && !blog_image2 ? <p style={{color: "red"}}>{formErrors.blog_image1}</p> : ""} */}
                                    </div>
                              </div>
                              <div class="row">
                                    <div class="col-md-6">
                                    {role>0 && role<2 ? (
                                    <>
                                          <label for="inputNanme4" class="form-label"><b>Select Lawyer</b></label>
                                          <select class="form-select" id="example-select" name='Lawyer_id' value={lawyer_id} select onChange={(e)=>setLawyerid(e.target.value)}>
                                            <option value={0} >-select-</option> 
                                            {l_name.map((ltype) => (
                                              <>{ltype.status != 1 ? "" : <option value={ltype.lawyer_id}>{ltype.name}</option>}</>
                                            ))}
    
                                          </select>
                                          <p style={{color: "red"}}>{formErrors.lawyer_id}</p>
                                    </>
                                    ):
                                    role>0 && role<3 ? (
                                    <>
                                          <label for="inputNanme4" class="form-label"><b>Lawyer Name</b></label>
                                          <input class="form-control" id="example-select" name='Lawyer_id' defaultValue={name} onChange={(e)=>setLawyerid(e.target.value)} disabled></input>
                                          <p style={{color: "red"}}>{formErrors.lawyer_id}</p>
                                    </>
                                    ):("")}
                                    
                                    </div>

                                    <div class="col-md-6">
                                          <label for="inputNanme4" class="form-label"><b>Select Image</b></label>
                                          <input type="file" class="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
                                          {/* <p style={{color: "red"}}>{formErrors.blog_image1}</p> */}
                                          {!blog_image1 && !blog_image2 ? <p style={{color: "red"}}>{formErrors.blog_image1}</p> : ""}
                                    </div>
                              </div>

                              <div class="row">
                                   

                                    <div class="col-md-6">
                                          <label for="inputNanme4" class="form-label"><b>Blog Title</b></label>
                                          <input type="text" class="form-control" id="inputNanme4" placeholder='Enter blog Title' defaultValue={blog_title} onChange={(e)=>setTitle(e.target.value)}/>
                                          <p style={{color: "red"}}>{formErrors.blog_title}</p>
                                    </div>

                                    <div class="col-md-6">
                                          <label for="inputNanme4" class="form-label"><b>Status</b></label>
                                              <select class="form-select" aria-label="Default select example" value={status} select onChange={(e)=>setStatus(e.target.value)}>
                                                  <option selected>--Select--</option>
                                                  <option value="1">Active</option>
                                                  <option value="2">Inactive</option>
                                              </select>
                                          <p style={{color: "red"}}>{formErrors.status}</p>
                                    </div>    
                              </div>

                              <div class="col-12">
                                    <div class="quill-editor-default">
                                          <label for="inputNanme4" class="form-label"><b>Blog Description</b></label><br/>
                                          <textarea type="text" class="form-control" id="inputNanme4" placeholder='Enter Blog Description' defaultValue={blog_desc} onChange={(e)=>setDescription(e.target.value)}/> 
                                          <p style={{color: "red"}}>{formErrors.blog_desc}</p>                             
                                    </div>
                              </div>
                 
                              <div class="text-center mt-3">
                                    <button type="submit" class="btn btn-primary rounded-pill" style={{marginRight:"10px"}} onClick={submithandle}><b>Submit</b></button>
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
