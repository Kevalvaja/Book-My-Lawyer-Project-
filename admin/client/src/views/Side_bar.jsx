import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function Side_bar() {

    const role = sessionStorage.getItem("role");
    const[Contact,setcontact]=useState([]);
    const[abouts,setabout]=useState([]);

// Display Contact Edit Form
    useEffect(()=>{
      fatchcontact();
    },[]);

    const fatchcontact=async ()=>{
      try{
        const res=await axios.get("http://localhost:8866/backend/contact");
        setcontact(res.data);
      }
      catch(err){
        alert(err);
      }
    }

// Display About Edit Form
    useEffect(()=>{
        fatchuser();
    },[]);

    const fatchuser=async ()=>{
    try
    {
          const res=await axios.get("http://localhost:8866/backend/about");
          setabout(res.data);
    }
    catch(err)
    {
          alert(err);
    }
    }

  return (
    <div>
        {role>0 && role<2 ?(
            <aside id="sidebar" class="sidebar">

            <ul class="sidebar-nav" id="sidebar-nav">
    
            <li class="nav-item">
                <Link class="nav-link " to="/">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </Link>
            </li>
    
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                <i class="ri-user-settings-line"></i><span>Manage</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">     
                <li>
                    <Link to="/Display_lawyer">
                        <i class="bi bi-circle"></i><span>Lawyer</span>   
                    </Link>
                </li>
                <li>
                    <Link to="/Display_lawyer_categories">
                        <i class="bi bi-circle"></i><span>Lawyer Categories</span>
                    </Link>
                </li>
                
                <li>
                    <Link to="/Display_inquiry">
                        <i class="bi bi-circle"></i><span>Inquiry</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Display_blog">
                    <i class="bi bi-circle"></i><span>Blog</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Display_client">
                    <i class="bi bi-circle"></i><span>Client</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Display_client_appointment">
                    <i class="bi bi-circle"></i><span>Client Appointment</span>
                    </Link>
                </li>
                </ul>
            </li>
    
            <li class="nav-heading">Pages</li>
    
            <li class="nav-item">
                <Link class="nav-link collapsed" to="/Admin_profile">
                    <i class="bi bi-person"></i>
                    <span>Profile</span>
                </Link>
            </li>
    
            <li class="nav-item">
    {abouts.map((about)=>
        <Link class="nav-link collapsed" to={"/About_form/"+about.about_id}>
        <i class="bi bi-envelope"></i>
        <span>About Us</span>
        </Link>
    )}
    </li>

    <li class="nav-item">
    {Contact.map((contact)=>
        <Link class="nav-link collapsed" to={"/contact/"+contact.contact_id}>
        <i class="bi bi-telephone"></i>
        <span>Contact</span>
        </Link>
    )}
    </li>

    <li class="nav-item">
        <Link class="nav-link collapsed" to="/Displayfeedback">
        <i class="bi bi-chat-text"></i>
        <span>Feedback</span>
        </Link>
    </li>    
            </ul>
    
            </aside>
        ):
        role>0 && role<3?(
            <aside id="sidebar" class="sidebar">

            <ul class="sidebar-nav" id="sidebar-nav">
    
            <li class="nav-item">
                <Link class="nav-link " to="/">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                <i class="ri-user-settings-line"></i><span>Manage</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                
                <li>
                    <Link to="/Display_client_appointment">
                    <i class="bi bi-circle"></i><span>Client Appointment</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Display_blog">
                    <i class="bi bi-circle"></i><span>Blog</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Display_inquiry">
                        <i class="bi bi-circle"></i><span>Display Client Inquiry</span>
                    </Link>
                </li>
                </ul>
            </li>

            <li class="nav-item">
                <Link class="nav-link collapsed" to="/Display_inquiry_lawyer">
                    <i class="bi bi-question-circle-fill"></i>
                    <span>Add Inquiery</span>
                </Link>
            </li>

            <li class="nav-item">
                <Link class="nav-link collapsed" to="/Admin_profile">
                    <i class="bi bi-person"></i>
                    <span>Profile</span>
                </Link>
            </li>
            
            </ul>
            </aside>
        ):("")}
        
    </div>
  )
}
