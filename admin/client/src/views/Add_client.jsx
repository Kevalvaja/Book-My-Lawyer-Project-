import React from 'react'
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

export default function Add_client() {

  const[client_name,setName]=useState('');
  const[mobile_no,setNumber]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[dob,setDob]=useState('');
  const[age,setAge]=useState('');
  const[address,setAddress]=useState('');
  const[city,setCity]=useState('');
  const[country,setCountry]=useState('india');
  const[status,setStatus]=useState('');


  const[formErrors,setFormErrors]=useState({});


  const location=useLocation();
  const clientid=location.pathname.split("/")[2];

  
  useEffect(()=>{
                  fatchclient();
  },[]);


  const navigate = useNavigate();


  const fatchclient=async()=>{
    try
    {
                const res=await axios.get("http://localhost:8866/backend/client/"+clientid);
                          setName(res.data.client_name);
                          setNumber(res.data.mobile_no);
                          setEmail(res.data.email);
                          setPassword(res.data.password);
                          setDob(res.data.dob);
                          setAge(res.data.age);
                          setAddress(res.data.address);
                          setCity(res.data.city);
                          //setCountry(res.data.country);
                          setStatus(res.data.status);
    }
    catch(err)
    {
                          alert(err);
    }
  }


  const validate = ()=>{
    const errors={};
    if(!client_name)
    {
      errors.client_name="Please Enter Name";
    }
    if(!mobile_no)
    {
      errors.mobile_no="Please Enter Mobile_no";
    }
    else if(mobile_no && mobile_no.length != 10)
    {
      errors.mobile_no="Please Enter 10 digit Mobile_no";
    }
    if(!email)
    {
      errors.email="Please Enter Email";
    }
    if(!password)
    {
      errors.password="Please Enter Password";
    }
    else if(password.length < 8 && password)
    {
      errors.password="Please Enter Atleast 8 character";
    }
    if(!dob)
    {
      errors.dob="Please Enter Dob";
    }
    if(!age)
    {
      errors.age="Please Enter Age";
    }
    if(!address)
    {
      errors.address="Please Enter Address";
    }
    if(!city)
    {
      errors.city="Please Enter City";
    }
    if(!status)
    {
      errors.status="Please Select Status";
    }    
    return errors;
  }


  const submithandle=async(e)=>
  {
    const entry_by=1;
    
    e.preventDefault();
    setFormErrors(validate());
    if(client_name && mobile_no && email && password && dob && age && address && city && status && password.length >= 8 && mobile_no.length == 10)
    {
          try
          {
                if(clientid)
                {
                           const res=await axios.put("http://localhost:8866/backend/client/"+clientid,{
                                      client_name,
                                      mobile_no,
                                      email,
                                      password,
                                      dob,
                                      age,
                                      address,
                                      city,
                                      country,
                                      status,
                                      entry_by
                            });
                            alert(res.data);
                            navigate("/Display_client");
                }
                else
                {
                            const res=await axios.post("http://localhost:8866/backend/client",{
                                      client_name,
                                      mobile_no,
                                      email,
                                      password,
                                      dob,
                                      age,
                                      address,
                                      city,
                                      country,
                                      status,
                                      entry_by
                            });
                            alert(res.data);
                            navigate("/Display_client");
                }
         }
        catch(err)
        {
                            alert(err);
        }
    }
  }
    

  const display_client = () => {
    navigate("/Display_client")
  }


  return (
    <div>
       <main id="main" class="main">
            <div class="col-lg-12" >
                <div class="card">
                    <div class="card-body row">
                        {!clientid? <h5 class="card-title col-6">Add Client</h5> : <h5 class="card-title col-6">Edit Client</h5>}
                
                         <div class="col-6 mt-3">
                              <button type='button' class="btn btn-danger float-start mb-3 rounded-pill float-end" onClick={display_client}><b>Back</b></button>
                        </div>
                
                        <form class="row mt-0">

                              <div class="row">
                                    <div class="col-md-6">
                                            <label for="inputNanme4" class="form-label"><b>Client Name</b></label>
                                            <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Client Name' defaultValue={client_name} onChange={(e)=>setName(e.target.value)}/>
                                            <p style={{color: "red"}}>{formErrors.client_name}</p>
                                    </div>
                       
                                    <div class="col-md-6">
                                            <label for="inputNanme4" class="form-label"><b>Mobile No</b></label> 
                                            <input type="text" class="form-control" id="inputAddress" placeholder="Enter Mobile no" defaultValue={mobile_no} onChange={(e)=>setNumber(e.target.value)}/>
                                            <p style={{color: "red"}}>{formErrors.mobile_no}</p>
                                    </div>
                              </div>


                              <div class="row">
                                    <div class="col-md-6">
                                            <label for="inputNanme4" class="form-label"><b>Email</b></label> 
                                            <input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email-id' defaultValue={email} onChange={(e)=>setEmail(e.target.value)}/>
                                            <p style={{color: "red"}}>{formErrors.email}</p>
                                    </div>
  
                                    <div class="col-md-6">
                                            <label for="inputNanme4" class="form-label"><b>Password</b></label>
                                            <input type="password" class="form-control" id="inputNanme4" placeholder='Enter Password' defaultValue={password} onChange={(e)=>setPassword(e.target.value)}/>
                                            <p style={{color: "red"}}>{formErrors.password}</p>
                                    </div>
                              </div>

                              <div class="row">
                                    <div class="col-md-6">
                                            <label for="inputNanme4" class="form-label"><b>Date of Birth</b></label>
                                            <input type="date" class="form-control" id="inputNanme4" defaultValue={dob} onChange={(e)=>setDob(e.target.value)}/>
                                            <p style={{color: "red"}}>{formErrors.dob}</p>
                                    </div>

                                    <div class="col-md-6">
                                            <label for="inputNanme4" class="form-label"><b>Age</b></label>
                                            <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Age' defaultValue={age} onChange={(e)=>setAge(e.target.value)}/>
                                            <p style={{color: "red"}}>{formErrors.age}</p>
                                    </div>
                              </div>

                              <div class="row">
                                    <div class="col-md-6">
                                            <label for="inputNanme4" class="form-label"><b>Address</b></label>
                                            <textarea type="text" class="form-control" id="inputNanme4" placeholder='Enter Address' defaultValue={address} onChange={(e)=>setAddress(e.target.value)}/>
                                            <p style={{color: "red"}}>{formErrors.address}</p>
                                    </div>

                                    <div class="col-md-6 ">
                                            <label for="inputNanme4" class="form-label"><b>City</b></label>
                                            <input type="text" class="form-control" id="inputNanme4" placeholder='Enter City' defaultValue={city} onChange={(e)=>setCity(e.target.value)}/>
                                            <p style={{color: "red"}}>{formErrors.city}</p>
                                    </div>                                    
                              </div>

                              <div class="row">
                                    <div class="col-md-6">
                                            <label for="inputNanme4" class="form-label"><b>Country</b></label>
                                            <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Country' defaultValue={country} disabled/>
                                            <p style={{color: "red"}}>{formErrors.country}</p>
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

                              <div class="text-center mt-3">
                                    <button type="submit" class="btn btn-primary rounded-pill" onClick={submithandle} style={{marginRight:'10px'}}><b>Submit</b></button>
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
