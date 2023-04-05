import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';


export default function About_form() {

  //declare
  const[description,setDescription]=useState('');
  const[description1,setDescription1]=useState('');
  //validation variable
  const[formErrors,setFormErrors]=useState({});

  const adminId = sessionStorage.getItem("user");
  const location=useLocation();
  const aboutid=location.pathname.split("/")[2] ? location.pathname.split("/")[2]: "";


  useEffect(()=>{
    fatchabout();
  },[]);

  const fatchabout=async()=>{
    try
    {
             const res=await axios.get("http://localhost:8866/backend/about/"+aboutid);
             setDescription1(res.data.description);
    }
    catch(err)
    {
             alert(err);
    }
  }


  //image upload function
  // const upload=async()=>{
  //   if(image1!="")
  //   {
  //     try
  //     {
  //           const formdata = new FormData();
  //           formdata.append("file",image1);
  //           const res = await axios.post("http://localhost:8866/backend/upload",formdata);
  //           insertdata(res.data);
  //     }
  //     catch(err)
  //     {
  //           alert(err);
  //     }
  //   }
  //   else
  //   {
  //       insertdata(image2)
  //   }
  // }


  //insert function call
  const submithandle = async(e)=>{
    e.preventDefault();
    setFormErrors(validate());
    const entry_by=adminId;
    let res="";
    try
    {
      if(aboutid && description)
      {
              res=await axios.put("http://localhost:8866/backend/about/"+aboutid,{
                description,
                entry_by
              });     
              alert(res.data);
      }    
    }
    catch(err)
    {
      alert(err);
    }
  }

// Validation code
  const validate=()=>{
    const errors={};
    if(!description)
    {
      errors.description="Please Enter Description"
    }
    return errors;
  }

  return (
    <div>
          <main id="main" class="main">
                <div class="col-lg-12">
                      <div class="card">
                            <div class="card-body row">
                                  <h5 class="card-title col-6">About Us Form</h5>

                                 <form class="row g-3">
                                        <div class="col-12">
                                              <div class="quill-editor-default">
                                                    <label for="inputNanme4" class="form-label"><b>Description</b></label><br/>
                                                    <textarea type="text" class="form-control" id="inputNanme4" placeholder='Enter Description' defaultValue={description1} onChange={(e)=>setDescription(e.target.value)}/>                              
                                                    <p style={{color: "red"}}>{formErrors.description}</p>
                                              </div>
                                        </div>

                                        <div class="text-center">
                                              <button type="submit" class="btn btn-primary rounded-pill" onClick={submithandle}><b>Submit</b></button>
                                        </div>
                                        
                                  </form> 
                            </div>
                      </div>
                </div>
          </main>
    </div>
  )
}
