import React from 'react'
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function Add_client_appointment() {

  
  const lawyerId = sessionStorage.getItem("user");
  const role = sessionStorage.getItem("role");
  const[c_name,setCtype] = useState([]);
  const[l_name,setLtype]=useState([]);
  const[client_name,setClient]=useState([]);

  const[client_id,setclientid]=useState('');
  const[lawyer_id,setlawyerid]=useState('');
  const[appointment_title,setTitle]=useState('');
  const[appointment_date,setDate]=useState('');
  const[message,setMessage]=useState('');
  const[gender,setGender]=useState('');
  const[category_id,setCategory]=useState('');
  // const[client_image1,setImage]=useState('');
  // const[client_image2,setImage2]=useState('');
  // const[case_date,setCasedate]=useState('');
  const[status,setStatus]=useState('');
  const[case_status,setCaseStatus] = useState('');
  const[name,setLawyer_name] = useState('');
  const[formErrors,setFormErrors]=useState({});

  const location=useLocation();
  const appointmentid=location.pathname.split("/")[2] ? location.pathname.split("/")[2]:"";


  useEffect(()=>{
    selectCategory();
    selectlawyer();
    selectclient();
    fatchappointment();
    if(role == 2)
    {
      lawyer_name();
    }
  },[]);


  const navigate=useNavigate();


  const fatchappointment=async()=>{
    try
    {
              const res=await axios.get("http://localhost:8866/backend/client_appointment/"+appointmentid);
                        setclientid(res.data.client_id);
                        setlawyerid(res.data.lawyer_id);
                        setTitle(res.data.appointment_title);
                        setDate(res.data.appointment_date);
                        setMessage(res.data.message);
                        setGender(res.data.gender);
                        //setImage2(res.data.client_image);
                        //setCasedate(res.data.case_date);
                        setStatus(res.data.status);
                        setCategory(res.data.category_id);
                        setCaseStatus(res.data.case_status);
    }
    catch(err)
    {
                        alert(err);
    }
  }


  /* const upload=async()=>{
     if(client_image1!="")
     {
           try
           {
                 const formdata = new FormData();
                 formdata.append("file",client_image1);
                 const res = await axios.post("http://localhost:8866/backend/upload",formdata);
                 insertdata(res.data);
           }
           catch(err)
           {
                 alert(err);
           }
     }
     else
     {
           insertdata(client_image2);
     }
   
   const insertdata=async(client_image)=>{

     try
     {
           if(appointmentid)
           {
                       res=await axios.put("http://localhost:8866/backend/client_appointment/"+appointmentid,{
                           client_id,
                           lawyer_id,
                           appointment_title,
                           appointment_date,
                           message,
                           gender,
                           case_category,
                           //client_image,
                           //case_date,
                           status,
                           entry_by
                       });
           }      
           else
           {
                       res=await axios.post("http://localhost:8866/backend/client_appointment",{
                           client_id,
                           lawyer_id,
                           appointment_title,
                           appointment_date,
                           message,
                           gender,
                           case_category,
                           //client_image,
                           //case_date,
                           status,
                           entry_by
                         });
           }
     }
     catch(err)
     {
                 alert(err);
     }
    alert(res.data);
     navigate("/Display_client_appointment");
   }
  */


  const validate=()=>{
    const errors={};
    if(!appointment_title)
    {
      errors.appointment_title="Please Enter Appointment Title";
    }
    if(!appointment_date)
    {
      errors.appointment_date="Please Enter Appointment Date";
    }
    if(!message)
    {
      errors.message="Please Enter Message";
    }
    if(!gender)
    {
      errors.gender="Please Select Gender";
    }
    if(!category_id || category_id == 0)
    {
      errors.category_id="Please Select Case Category";
    }
    if(!client_id || client_id == 0)
    {
      errors.client_id="Please Select Client";
    }
    if(role == 1 && !lawyer_id || lawyer_id == 0)
    {
      errors.lawyer_id="Please Select Lawyer";
    }
    if(!status || status == 0)
    {
      errors.status="Please Select Status";
    }
    return errors;
  }


  const submithandle=async(e)=>{
    
    const entry_by=1;
  
    e.preventDefault();
    setFormErrors(validate());
    if(role>0 && role<2)
    {
      if(appointment_title && appointment_date && message && gender && category_id && client_id && lawyer_id && status
        && lawyer_id > 0 && category_id > 0 && client_id > 0 && status > 0)
      {
            try
            {

                  if(appointmentid)
                  {
                       const res=await axios.put("http://localhost:8866/backend/client_appointment/"+appointmentid,{
                            client_id,
                            lawyer_id,
                            appointment_title,
                            appointment_date,
                            message,
                            gender,
                            status,
                            entry_by,
                            category_id,
                            case_status
                        });
                        alert(res.data);
                        navigate("/Display_client_appointment");
                  }      
                  else
                  {
                      let case_status = 1;
                       const res=await axios.post("http://localhost:8866/backend/client_appointment",{
                            client_id,
                            lawyer_id,
                            appointment_title,
                            appointment_date,
                            message,
                            gender,
                            status,
                            entry_by,
                            category_id,
                            case_status
                          });
                          alert(res.data);
                          navigate("/Display_client_appointment");
                  }             
            }
            catch(err)
            {
                            alert(err);
            }
      }
    }
    else
    {
      if(appointment_title && appointment_date && message && gender && category_id && client_id && status
        && lawyer_id > 0 && category_id > 0 && client_id > 0 && status > 0)
      {
          let lawyer_id = lawyerId;
            try
            {
                  if(appointmentid)
                  {
                       const res=await axios.put("http://localhost:8866/backend/client_appointment/"+appointmentid,{
                            client_id,
                            lawyer_id,
                            appointment_title,
                            appointment_date,
                            message,
                            gender,
                            status,
                            entry_by,
                            category_id,
                            case_status
                        });
                        alert(res.data);
                        navigate("/Display_client_appointment");
                  }      
                  else
                  {
                    let case_status = 2;
                       const res=await axios.post("http://localhost:8866/backend/client_appointment",{
                            client_id,
                            lawyer_id,
                            appointment_title,
                            appointment_date,
                            message,
                            gender,
                            status,
                            entry_by,
                            category_id,
                            case_status
                          });
                          alert(res.data);
                          navigate("/Display_client_appointment");
                  }             
            }
            catch(err)
            {
                            alert(err);
            }
      }
    }
  }

  /* Display in dropdown list of lawyer category */
  const selectCategory = async() => {
    try{
      const res = await axios.get("http://localhost:8866/backend/category")
      setCtype(res.data);
    }
    catch(err){
      alert(err);
    }
  }

// Display In Dropdown List of Lawyer
  const selectlawyer =async()=>{
    try
    {
      const res=await axios.get("http://localhost:8866/backend/lawyer");
      setLtype(res.data);
    }
    catch(err)
    {
      alert(err);
    }
  }

  // Display in dropdown list
  const selectclient = async () => {
    try
    {
      const res=await axios.get("http://localhost:8866/backend/client")
      setClient(res.data);
    }
    catch(err)
    {
      alert(err);
    }
  }

  //back button
  const Display_client_appointment = ()=>{
    navigate("/Display_client_appointment")
  }

  const lawyer_name = async() => {
    try{
      if(role == 2)
      {
        const res = await axios.get("http://localhost:8866/backend/lawyer/"+lawyerId);
        setLawyer_name(res.data.name);
      }
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
                        {!appointmentid? <h5 class="card-title col-6">Add Client Appointment</h5> : <h5 class="card-title col-6">Edit Client Appointment</h5>}

                        <div class="col-6 mt-3">
                            <button type='button' class="btn btn-danger float-start mb-3 rounded-pill float-end" onClick={Display_client_appointment}><b>Back</b></button>
                        </div>

                        <form class="row g-3">

                            <div class="row">
                                <div class="col-md-6">
                                  {role>0 && role<2 ?( 
                                    <>
                                      <label for="inputNanme4" class="form-label"><b>Select Lawyer</b></label>
                                      <select class="form-select" id="example-select" name='category_id' value={lawyer_id} select onChange={(e)=>setlawyerid(e.target.value)}>
                                        <option value={0} >-select-</option>
                                
                                        {l_name.map((ltype) => (
                                          <>{ltype.status != 1 ? "" : <option value={ltype.lawyer_id}>{ltype.name}</option>}</>
                                        ))}

                                      </select>
                                      <p style={{color: "red"}}>{formErrors.lawyer_id}</p>
                                    </>): role>0 && role<3?(
                                      <>
                                         <label for="inputNanme4" class="form-label"><b>Lawyer Name</b></label>
                                          <input class="form-control" id="example-select" name='Lawyer_id' defaultValue={name} onChange={(e)=>setlawyerid(e.target.value)} disabled></input>
                                          <p style={{color: "red"}}>{formErrors.lawyer_id}</p>
                                      </>
                                    )
                                    :("")}
                                </div>

                                <div class="col-md-6">
                                      <label for="inputNanme4" class="form-label"><b>Select Client</b></label>
                                      <select class="form-select" id="example-select" name='category_id' value={client_id} select onChange={(e)=>setclientid(e.target.value)}>
                                        <option value={0} >-select-</option>
                                
                                        {client_name.map((clienttype) => (
                                          <>{clienttype.status != 1 ? "" : <option value={clienttype.client_id}>{clienttype.client_name}</option>}</>
                                        ))}

                                      </select>
                                      <p style={{color: "red"}}>{formErrors.client_id}</p>
                                </div>
                            </div>
                     
                            <div class="row">
                                <div class="col-md-6">
                                      <label for="inputNanme4" class="form-label"><b>Apoointment Title</b></label>
                                      <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Case Title' defaultValue={appointment_title} onChange={(e)=>setTitle(e.target.value)}/>
                                      <p style={{color: "red"}}>{formErrors.appointment_title}</p>
                                </div>
                                <div class="quill-editor-default col-md-6">
                                      <label for="inputNanme4" class="form-label"><b>Message</b></label>
                                      <textarea type="text" class="form-control" id="inputNanme4" placeholder='Enter Message' defaultValue={message} onChange={(e)=>setMessage(e.target.value)}/>                              
                                      <p style={{color: "red"}}>{formErrors.message}</p>
                                </div>
                            </div>
                        
                            <div class="row">  
                                <div class="col-md-6">
                                      <label for="inputNanme4" class="form-label"><b>Appointment Date</b></label>
                                      <input type="date" class="form-control" id="inputNanme4" placeholder='Enter Appointment Date' value={appointment_date} onChange={(e)=>setDate(e.target.value)}/>
                                      <p style={{color: "red"}}>{formErrors.appointment_date}</p>
                                </div>
                     
                                <div class="col-md-6 ">
                                      <label for="inputEmail4" class="form-label"><b>Gender</b></label><br/>
                                      <input type="radio" value="1" checked={gender>0 && gender<2 ? gender :""} onChange={(e)=>setGender(e.target.value)}/>
                                      <label class="form-check-label  px-2" for="gridRadios1">Male</label>
                          
                                      <input  type="radio" value="2" checked={gender>1 && gender<3 ? gender :""} onChange={(e)=>setGender(e.target.value)}/>
                                      <label class="form-check-label px-2" for="gridRadios1">Female</label>

                                      <p style={{color: "red"}}>{formErrors.gender}</p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                      <label for="inputNanme4" class="form-label"><b>Case Category</b></label>
                                      <select class="form-select" id="example-select" name='category_id' value={category_id} select onChange={(e)=>setCategory(e.target.value)}>
                                        <option value={0} >-select-</option>
                                        {c_name.map((ctype) => (
                                          <>{ctype.status != 1 ? "" : <option value={ctype.category_id}>{ctype.category_name}</option>}</>
                                        ))}
                                      </select>
                                      <p style={{color: "red"}}>{formErrors.category_id}</p>
                                </div>

                                <div class="col-md-6">
                                      <label for="inputNanme4" class="form-label"><b>Status</b></label>
                                      <select class="form-select" aria-label="Default select example" value={status} select onChange={(e)=>setStatus(e.target.value)}>
                                              <option value="0">--Select--</option>
                                              <option value="1">Active</option>
                                              <option value="2">Inactive</option>
                                      </select>
                                      <p style={{color: "red"}}>{formErrors.status}</p>
                                </div>
                                {/* <div class="col-md-6">
                                      <label for="inputNanme4" class="form-label"><b>Add Image</b></label>
                                      <img src={`../upload/${client_image2}`} width={100} height={100}></img>
                                      <input type="file" class="form-control" defaultValue={client_image1} onChange={(e)=>setImage(e.target.files[0])}/>
                                      <p style={{color: "red"}}>{formErrors.client_image1}</p>
                                </div> */}
                            </div>
                          

                            <div class="row">
                                {/* <div class="col-md-6">
                                      <label for="inputNanme4" class="form-label"><b>Case Date</b></label>
                                      <input type="date" class="form-control" id="inputNanme4" defaultValue={case_date} onChange={(e)=>setCasedate(e.target.value)}/>
                                      <p style={{color: "red"}}>{formErrors.case_date}</p>
                                </div> */}
                                
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
