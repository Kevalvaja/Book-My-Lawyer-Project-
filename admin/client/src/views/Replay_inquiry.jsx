import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';

export default function Replay_inquiry() {

  const role = sessionStorage.getItem("role");
  const Id = sessionStorage.getItem("user");
  const entry_by = Id;
  const [client_name,setClient_name] = useState('');
  const [lawyer_name,setLawyer_name] = useState('');
  const [replay_inquiry,setReplay_inquiry]=useState('');
  const [message,setMessage] = useState('');
  const [inquiry_title,setInquiry_title]=useState('');
  const navigate = useNavigate();
  
  const location = useLocation();
  const Inquiry_Id = location.pathname.split("/")[2];

  const [formerror,setFormerror]=useState({});

  const Display_inquiry = () => {
    navigate("/Display_inquiry")
  }

  useEffect(()=>{
   store_inquiry();
  },[])

  const store_inquiry = async(e) => {
    try{
      const res = await axios.get("http://localhost:8866/backend/replay_inquiry/"+Inquiry_Id);
      setClient_name(res.data.client_name);
      setLawyer_name(res.data.name);
      setInquiry_title(res.data.inquiry_title);
      setMessage(res.data.message);
    }
    catch(err){
      alert(err);
    }
   
  }

    const replayInquiry = async(e) => {
      e.preventDefault();
      setFormerror(validation());
      if(replay_inquiry)
      {
        try{
          const res = await axios.put("http://localhost:8866/backend/replay_inquiry/"+Inquiry_Id,{
            replay_inquiry,
            entry_by
          });
          alert(res.data);
          navigate("/Display_inquiry");
        }
        catch(err){
          alert(err);
        }
      }
    }
      
    
    const validation = () => {
      const error = {};
      if(!replay_inquiry)
      {
        error.replay_inquiry = "Please enter reply inquiry";
      }
      return error;
    }
  return (
    <div>
      {role>0 && role<2? (
        <main id="main" class="main">
        <div class="col-lg-12" >
              <div class="card">
                  <div class="card-body row">
                  <h5 class="card-title col-6">Reply Inquiry</h5>
                  <div class="col-6">
                    <button type="button" class="btn btn-danger float-end mt-3 rounded-pill" onClick={Display_inquiry}><b>Back</b></button>
                  </div>
                      <form class="row g-3">
                          <div class="col-md-12">
                            {lawyer_name? 
                              <label class="form-label"><b style={{ marginRight: "10px" }}>Lawyer Name :-</b>{lawyer_name}</label> 
                              : 
                              <label class="form-label"><b style={{ marginRight: "10px" }}>Client Name :-</b>{client_name}</label>
                            }
                          </div>
  
                          <div class="col-md-12">
                            <label class="form-label"><b style={{ marginRight: "10px" }}>Inquiry Title :-</b>{inquiry_title}</label>
                          </div>
  
                          <div class="col-md-12">
                            <label class="form-label"><b style={{ marginRight: "10px" }}>Inquiry Message :-</b>{message}</label>
                          </div>
  
                          <div class="col-md-12">
                            <label class="form-label"><b>Reply Inquiry</b></label>
                            <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Reply Inquiry Details' onChange={(e)=>setReplay_inquiry(e.target.value)}/>
                            <p style={{color:'red'}}>{formerror.replay_inquiry}</p>
                          </div>
                          <div class="text-center">
                            <button type="submit" class="btn btn-primary rounded-pill" onClick={replayInquiry} style={{ marginRight: "10px" }}><b>Submit</b></button>
                            <button type="reset" class="btn btn-secondary rounded-pill"><b>Reset</b></button>
                          </div>
                      </form>
                  </div>
              </div>
        </div>
        </main>
      ):role>0 && role<3?(
        <main id="main" class="main">
        <div class="col-lg-12" >
              <div class="card">
                  <div class="card-body row">
                  <h5 class="card-title col-6">Reply Inquiry</h5>
                  <div class="col-6">
                    <button type="button" class="btn btn-danger float-end mt-3 rounded-pill" onClick={Display_inquiry}><b>Back</b></button>
                  </div>
                      <form class="row g-3">
                          <div class="col-md-12">
                              <label class="form-label"><b style={{ marginRight: "10px" }}>Client Name :-</b>{client_name}</label>
                          </div>
  
                          <div class="col-md-12">
                            <label class="form-label"><b style={{ marginRight: "10px" }}>Inquiry Title :-</b>{inquiry_title}</label>
                          </div>
  
                          <div class="col-md-12">
                            <label class="form-label"><b style={{ marginRight: "10px" }}>Inquiry Message :-</b>{message}</label>
                          </div>
  
                          <div class="col-md-12">
                            <label class="form-label"><b>Reply Inquiry</b></label>
                            <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Reply Inquiry Details' onChange={(e)=>setReplay_inquiry(e.target.value)}/>
                            <p style={{color:'red'}}>{formerror.replay_inquiry}</p>
                          </div>
                          <div class="text-center">
                            <button type="submit" class="btn btn-primary rounded-pill" onClick={replayInquiry} style={{ marginRight: "10px" }}><b>Submit</b></button>
                            <button type="reset" class="btn btn-secondary rounded-pill"><b>Reset</b></button>
                          </div>
                      </form>
                  </div>
              </div>
        </div>
        </main>
      ):("")}
      
    </div>
  )
}
