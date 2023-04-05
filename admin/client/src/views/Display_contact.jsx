import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Display_contact() {


    const[Contact,setcontact]=useState([]);
    let i=1;

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


    // const handledelete=async (e)=>{
    //   if(window.confirm("Are You Sure ??")==true)
    //   try{
    //     const res=await axios.delete("http://localhost:8866/backend/contact/"+e);
    //     window.location.reload();
    //   }
    //   catch(err){
    //     alert(err);
    //   }
    // }
  
      const navigate=useNavigate();


    


  return (
     <div>
        <main id="main" class="main">
          <div class="col-12" style={{width:"150%"}}>
              <div class="card">
                <div class="card-body">

                <h5 class="card-title">Manage Contact Us</h5>

        
                <table class="table table-striped" style={{marginTop:"20px",textAlign:"center"}}>
                
                <thead>
                      <tr>
                          <th>Action</th>
                          <th>#</th>
                          <th>Person Name</th>
                          <th>Address</th>
                          <th>Contact</th>
                          <th>Email</th>
                          <th>Website Link</th>
                          <th>Instagram Link</th>
                          <th>Facebook Link</th>
                          <th>Youtube Link</th>
                          <th>Location Link</th>
                          <th>Linked In</th>
                      </tr>
                </thead>
                
                <tbody>
                      {Contact.map((contact)=>
                        <tr>
                            <td>
                              <button type="submit" class="btn btn-outline-primary rounded-pill"><Link to={"/Contact/"+contact.contact_id}><i class="ri-draft-line" title='Update'></i></Link></button>
                              {/* <button type="submit" class="btn btn-outline-danger rounded-pill" onClick={handledelete }><i class="ri-delete-bin-line" title='Delete'></i></button> */}
                            </td>
                            <th>{i++}</th>
                            <td>{contact.c_person}</td>
                            <td>{contact.address}</td>                           
                            <td>{contact.contact_no}</td>
                            <td>{contact.email}</td>
                            <td>{contact.contact_no}</td>
                            <td>{contact.location_link}</td>
                            <td>{contact.instagram_link}</td>
                            <td>{contact.facebook_link}</td>
                            <td>{contact.facebook_link}</td>
                            <td>{contact.linkedin_link}</td>                     
                        </tr>
                      )}
                </tbody>
                
                </table>
                </div>
              </div>
          </div>
        </main>
    </div>
  )
}
