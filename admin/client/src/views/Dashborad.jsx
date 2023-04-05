import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
export default function Dashborad() {

  const[count_lawyer,setClawyer]=useState([]); // Store in Lawyer Record
  const[count_category,setCategory]=useState([]); // Store in Lawyer Category Record
  const[count_inquiry,setInquiry]=useState([]); // Store in Inquiry Record
  const[count_client1,setClient]=useState([]); // Store in Client Record
  const[count_appointment1,setAppointment]=useState([]); // Store in Appointment Record
  const[count_blog1,setBlog]=useState([]); // Store in Blog Record
  const[count_feedback1,setFeedback]=useState([]); //Store in Feedback Record
  const role = sessionStorage.getItem("role");
  const id = sessionStorage.getItem("user");
  const[count_pending_appointment1,setPending_appointment]=useState([]); // Store in pending Appointment Record
  const[count_approve_appointment1,setApprove_appointment]=useState([]); // Store in approve Appointment Record
  const[count_disapprove_appointment1,setDisapprove_appointment]=useState([]); // Store in disapprove Appointment Record

  useEffect(()=>{
    if(role == 1)
    {
      count_Lawyer(); // Define Function Lawyer Record
      count_Category(); // Define Function Lawyer category Record
      count_Inquiry(); // Define Function Inquiry Record
      count_client(); // Define Function Client Record
      count_appointment(); // Define Function Client Appointment Record
      count_blog(); // Define Function Blog Record
      count_feedback(); // Define Function Feedback Record
    }
    else
    {
      count_appointment(); // Define Function Client Appointment Record
      count_Inquiry(); // Define Function Inquiry Record
      count_blog(); // Define Function Blog Record
      count_pending_appointment(); // Count Pending Appointment
      count_approve_appointment(); // Count Approve Appoinement
      count_disapprove_appointment(); // Count Disapprove Appoinement
    }
    
  },[]);

  // Count Lawyer Record
  const count_Lawyer = async() => {
    try{
      const res = await axios.get("http://localhost:8866/backend/count_lawyer");
      setClawyer(res.data);
    }
    catch(err){
      alert(err);
    }
  }

  //Count Lawyer Category Record
  const count_Category = async() => {
    try{
      const res = await axios.get("http://localhost:8866/backend/count_category");
      setCategory(res.data)
    }
    catch(err){
      alert(err);
    }
  } 

  //Count Inquiry Record
  const count_Inquiry = async() => {
    if(role == 1)
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/count_inquiry");
        setInquiry(res.data);
      }
      catch(err){
        alert(err);
      }
    }
    else
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/count_inquiry/" + id);
        setInquiry(res.data);
      }
      catch(err){
        alert(err);
      }
    }
  }

  //Count Client Record
  const count_client = async() => {
    try{
      const res = await axios.get("http://localhost:8866/backend/count_client");
      setClient(res.data);
    }
    catch(err){
      alert(err);
    }
  }

  //Count Appointment Record
  const count_appointment = async() => {
    if(role == 1)
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/count_appointment");
        setAppointment(res.data);
      }
      catch(err){
        alert(err);
      }
    }
    else
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/count_appointment/" + id);
        setAppointment(res.data);
      }
      catch(err){
        alert(err);
      }
    }
    
  }

  //Count pending appointment
  const count_pending_appointment = async() => {
    if(role == 2)
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/count_pending_appointment/" + id);
        setPending_appointment(res.data);
      }
      catch(err){
        alert(err);
      }
    }
  }

    //Count approve appointment
    const count_approve_appointment = async() => {
      if(role == 2)
      {
        try{
          const res = await axios.get("http://localhost:8866/backend/count_approve_appointment/" + id);
          setApprove_appointment(res.data);
        }
        catch(err){
          alert(err);
        }
      }
    }

    //Count disapprove appointment
    const count_disapprove_appointment = async() => {
      if(role == 2)
      {
        try{
          const res = await axios.get("http://localhost:8866/backend/count_disapprove_appointment/" + id);
          setDisapprove_appointment(res.data);
        }
        catch(err){
          alert(err);
        }
      }
    }

  //Count Blog Record
  const count_blog = async() => {
    if(role == 1)
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/count_blog");
        setBlog(res.data);
      }
      catch(err){
        alert(err);
      }
    }
    else
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/count_blog/" + id);
        setBlog(res.data);
      }
      catch(err){
        alert(err);
      }
    }
  }

  //Count Feedback Record
  const count_feedback = async() => {
    try{
      const res = await axios.get("http://localhost:8866/backend/count_feedback");
      setFeedback(res.data);
    }
    catch(err){
      alert(err);
    }
  }
  return (
    <div>
      {role>0 && role<2 ? (
        <main id="main" class="main">
        <section class="section dashboard">
        <div class="row">
        <div class="col-lg-12">
          <div class="row">
            
            <div class="col-xxl-6 col-md-6">
              <div class="card info-card revenue-card">              
                <Link to="/Display_lawyer">
                  <div class="card-body">
                    
                    <h5 class="card-title">Total Lawyer</h5>
                    <div class="d-flex align-items-center">
                      <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-person-fill"></i>
                      </div>
                      <div class="ps-3">
                          <h6>{count_lawyer.lawyer_id}</h6>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            </div>

            <div class="col-xxl-6 col-md-6">
            <div class="card info-card revenue-card">              

            <Link to="/Display_lawyer_categories">
              <div class="card-body">
                
                <h5 class="card-title">Total Lawyer Category</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="bi bi-diagram-2-fill"></i>
                  </div>
                  <div class="ps-3">
                    <h6>{count_category.category_id}</h6>
                  </div>
                </div>

              </div>
            </Link>
            </div>
            </div>

            <div class="col-xxl-6 col-md-6">
            <div class="card info-card revenue-card">              

            <Link to="/Display_client">
            <div class="card-body">

            <h5 class="card-title">Total Client</h5>
            <div class="d-flex align-items-center">
            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i class="bi bi-person-fill"></i>
            </div>
            <div class="ps-3">
            <h6>{count_client1.client_id}</h6>
            </div>
            </div>

            </div>
            </Link>

            </div>
            </div>

            <div class="col-xxl-6 col-md-6">
            <div class="card info-card revenue-card">              

            <Link to="/Display_client_appointment">
            <div class="card-body">

            <h5 class="card-title">Total Client Appointment</h5>
            <div class="d-flex align-items-center">
            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-calendar-check-fill"></i>
            </div>
            <div class="ps-3">
            <h6>{count_appointment1.appointment_id}</h6>
            </div>
            </div>

            </div>
            </Link>
            </div>
            </div>

            <div class="col-xxl-6 col-md-6">
            <div class="card info-card revenue-card">              

            <Link to="/Display_inquiry">
              <div class="card-body">
                
                <h5 class="card-title">Total Inquiry</h5>
                <div class="d-flex align-items-center">
                  <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="bi bi-envelope-check-fill"></i>
                  </div>
                  <div class="ps-3">
                    <h6>{count_inquiry.inquiry_id}</h6>
                  </div>
                </div>

              </div>
            </Link>

            </div>
            </div>

            <div class="col-xxl-6 col-md-6">
            <div class="card info-card revenue-card">              

            <Link to="/Display_blog">
            <div class="card-body">

            <h5 class="card-title">Total Blog</h5>
            <div class="d-flex align-items-center">
            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i class="bi bi-chat-text-fill"></i>
            </div>
            <div class="ps-3">
            <h6>{count_blog1.blog_id}</h6>
            </div>
            </div>

            </div>
            </Link>

            </div>
            </div>

          <center>
            <div class="col-xxl-6 col-md-6">
            <div class="card info-card revenue-card">              

            <Link to="/Displayfeedback">
            <div class="card-body">

            <h5 class="card-title">Total Feedback</h5>
            <div class="d-flex align-items-center">
            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i class="bi bi-chat-text-fill"></i>
            </div>
            <div class="ps-3">
            <h6>{count_feedback1.feedback_id}</h6>
            </div>
            </div>

            </div>
            </Link>

            </div>
            </div>
          </center>

          </div>
        </div>
        </div>

        </section>

        </main>
      ): role>0 && role<3 ? (
        <main id="main" class="main">
        <section class="section dashboard">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">

                <div class="col-xxl-6 col-md-6">
                <div class="card info-card revenue-card">              

                <Link to="/Display_client_appointment">
                <div class="card-body">

                <h5 class="card-title">Total Client Appointment</h5>
                <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                  <i class="bi bi-calendar-check-fill"></i>
                </div>
                <div class="ps-3">
                <h6>{count_appointment1.appointment_id}</h6>
                </div>
                </div>

                </div>
                </Link>
                </div>
                </div>

                <div class="col-xxl-6 col-md-6">
                <div class="card info-card revenue-card">              

                <Link to="/Display_inquiry">
                  <div class="card-body">
                    
                    <h5 class="card-title">Total Inquiry</h5>
                    <div class="d-flex align-items-center">
                      <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-envelope-check-fill"></i>
                      </div>
                      <div class="ps-3">
                        <h6>{count_inquiry.inquiry_id}</h6>
                      </div>
                    </div>

                  </div>
                </Link>

                </div>
                </div>

                <div class="col-xxl-6 col-md-6">
                <div class="card info-card revenue-card">              

                <Link to="/Display_blog">
                <div class="card-body">

                <h5 class="card-title">Total Blog</h5>
                <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-chat-text-fill"></i>
                </div>
                <div class="ps-3">
                <h6>{count_blog1.blog_id}</h6>
                </div>
                </div>

                </div>
                </Link>

                </div>
                </div>

                <div class="col-xxl-6 col-md-6">
                <div class="card info-card revenue-card">              

                <Link to="/Display_client_appointment">
                <div class="card-body">

                <h5 class="card-title">Total Pending Appointment</h5>
                <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-hourglass-split"></i>
                </div>
                <div class="ps-3">
                <h6>{count_pending_appointment1.case_status}</h6>
                </div>
                </div>

                </div>
                </Link>

                </div>
                </div>

                <div class="col-xxl-6 col-md-6">
                <div class="card info-card revenue-card">              

                <Link to="/Approve_appointment">
                <div class="card-body">

                <h5 class="card-title">Total Approve Appointment</h5>
                <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-check-circle-fill"></i>
                </div>
                <div class="ps-3">
                <h6>{count_approve_appointment1.case_status}</h6>
                </div>
                </div>

                </div>
                </Link>

                </div>
                </div>

                <div class="col-xxl-6 col-md-6">
                <div class="card info-card revenue-card">              

                <Link to="/Disapprove_appoinment">
                <div class="card-body">

                <h5 class="card-title">Total Disapprove Appointment</h5>
                <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <i class="bi bi-x-circle-fill"></i>
                </div>
                <div class="ps-3">
                <h6>{count_disapprove_appointment1.case_status}</h6>
                </div>
                </div>

                </div>
                </Link>

                </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        </main>
      ):("")}
        
    </div>
  )
}
