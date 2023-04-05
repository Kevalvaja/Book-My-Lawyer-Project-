import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Contact_form() {

  const[c_person,setPerson]=useState('');
  const[address,setAddress]=useState('');
  const[email,setEmail]=useState('');
  const[contact_no,setContact]=useState('');
  const[website_link,setWebsite]=useState('');
  const[location_link,setLocation]=useState('');
  const[instagram_link,setInstagram]=useState('');
  const[facebook_link,setFacebook]=useState('');
  const[youtube_link,setYoutube]=useState('');
  const[linkedin_link,setLinkedin]=useState('');
  
  const[formErrors,setFormErrors]=useState({});

  const location=useLocation();
  const contactid=location.pathname.split("/")[2];


  //   const navigate=useNavigate();


  useEffect(()=>{
      fetchcontact();
  },[]);

  const validate = ()=>{
      const errors={};
      if(!c_person)
      {
            errors.c_person="Please Enter Name";
      }
      if(!address)
      {
            errors.address="Please Enter Address";
      }
      if(!email)
      {
            errors.email="Please Enter Email";
      }
      if(!contact_no)
      {
            errors.contact_no="Please Enter contact number";
      }
      if(!website_link)
      {
            errors.website_link="Please Enter website link";
      }
      if(!location_link)
      {
            errors.location_link="Please Enter location link";
      }
      if(!instagram_link)
      {
            errors.instagram_link="Please Enter instagram link";
      }
      if(!facebook_link)
      {
            errors.facebook_link="Please Enter facebook link";
      }
      if(!youtube_link)
      {
            errors.youtube_link="Please Enter youtube link";
      }
      if(!linkedin_link)
      {
            errors.linkedin_link="Please Enter linkedin link";
      }
      return errors;
  }

  const submithandle=async(e)=>{
    e.preventDefault(); 
    setFormErrors(validate());
    if(c_person && address && email && contact_no && website_link && location_link && instagram_link && facebook_link && youtube_link && linkedin_link )
    {
      try
      {
            if(contactid)
            {
                          const res=await axios.put("http://localhost:8866/backend/contact/"+contactid,{
                                      c_person,
                                      address,
                                      email,
                                      contact_no,
                                      website_link,
                                      location_link,
                                      instagram_link,
                                      facebook_link,
                                      youtube_link,
                                      linkedin_link            
                          });               
                          alert(res.data);
            }
      }
      catch(err)
      {
            alert(err);
      }
    }
    else
    {
      setFormErrors(validate())
    }
  }

  const fetchcontact = async() => {
      try{
            const res = await axios.get("http://localhost:8866/backend/contact/" + contactid);
            setPerson(res.data.c_person);
            setAddress(res.data.address);
            setEmail(res.data.email);
            setContact(res.data.contact_no);
            setWebsite(res.data.website_link);
            setLocation(res.data.location_link);
            setInstagram(res.data.instagram_link);
            setFacebook(res.data.facebook_link);
            setYoutube(res.data.youtube_link);
            setLinkedin(res.data.linkedin_link);
      }
      catch(err){
            alert(err);
      }
  }
  

  

  return (
    <div>
       <main id="main" class="main">
          <div class="col-lg-12" >
              <div class="card">
                  <div class="card-body row">
                      <h5 class="card-title col-6">Contact Us Form</h5>

                      <form class="row g-3">

                            <div class="row">
                                  <div class="col-md-6">
                                        <label for="inputNanme4" class="form-label"><b>Name</b></label>
                                        <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Name' value={c_person} onChange={(e)=>setPerson(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.c_person}</p>
                                  </div>
                                  <div class="col-md-6">
                                        <label for="inputNanme4" class="form-label"><b>Address</b></label>
                                        <input type="text" class="form-control" id="inputAddress" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.address}</p>
                                  </div>
                            </div>
                      
                            <div class="row">
                                  <div class="col-md-6">
                                        <label for="inputNanme4" class="form-label"><b>Email-id</b></label>
                                        <input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.email}</p>
                                  </div>
                                  <div class="col-md-6">
                                        <label for="inputNanme4" class="form-label"><b>Contact</b></label>
                                        <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Contact No' value={contact_no} onChange={(e)=>setContact(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.contact_no}</p>
                                  </div>
                            </div>

                            <div class="row">
                                  <div class="col-md-4">
                                        <label for="inputNanme4" class="form-label"><b>Website Link</b></label>
                                        <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Website Link' value={website_link} onChange={(e)=>setWebsite(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.website_link}</p>
                                  </div>  
                                  <div class="col-md-4">
                                        <label for="inputNanme4" class="form-label"><b>Location Link</b></label>
                                        <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Location Link' value={location_link} onChange={(e)=>setLocation(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.location_link}</p>
                                  </div>
                                  <div class="col-md-4">
                                        <label for="inputNanme4" class="form-label"><b>Instagram Link</b></label>
                                        <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Instagram Link' value={instagram_link} onChange={(e)=>setInstagram(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.instagram_link}</p>
                                  </div>
                            </div>
                        
                            <div class="row">
                                  <div class="col-md-4">
                                        <label for="inputNanme4" class="form-label"><b>Facebook Link</b></label>
                                        <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Facebook Link' value={facebook_link} onChange={(e)=>setFacebook(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.facebook_link}</p>
                                  </div>                                           
                                  <div class="col-md-4">
                                        <label for="inputNanme4" class="form-label"><b>Youtube Link</b></label>
                                        <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Youtube Link' value={youtube_link} onChange={(e)=>setYoutube(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.youtube_link}</p>
                                  </div>
                                  <div class="col-md-4">
                                        <label for="inputNanme4" class="form-label"><b>LinkedIn Link</b></label>
                                        <input type="text" class="form-control" id="inputNanme4" placeholder='Enter LinkedIn' value={linkedin_link} onChange={(e)=>setLinkedin(e.target.value)}/>
                                        <p style={{color: "red"}}>{formErrors.linkedin_link}</p>
                                  </div>
                            </div>                      
                        
                            <div class="text-center">
                                  <button type="submit" class="btn btn-primary rounded-pill" onClick={submithandle}><b>Submit</b></button>
                                  {/* <button type="reset" class="btn btn-outline-secondary rounded-pill"><b>Reset</b></button> */}
                            </div>
                   
                      </form>
                  </div>
              </div>
          </div>
       </main>
    </div>
  )
}
