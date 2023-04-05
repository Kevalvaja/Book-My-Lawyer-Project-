import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
//Datatable Modules
import "../../node_modules/datatables.net-dt/js/dataTables.dataTables";
import "../../node_modules/datatables.net-dt/css/jquery.dataTables.min.css";
import "../../node_modules/datatables.net-buttons/js/dataTables.buttons.js";
import "../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../node_modules/datatables.net-buttons/js/buttons.flash.js";
import "../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../node_modules/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
import "../../node_modules/datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js";
import $ from 'jquery'; 

export default function Display_client() {

  const[clients,setclient]=useState([]);
  let i=1;

  useEffect(()=>{
    fatchuser();
  },[]);

  const fatchuser=async ()=>{
    try{
      const res=await axios.get("http://localhost:8866/backend/client");
      setclient(res.data);
    }
    catch(err){
      alert(err);
    }
  }

  const handledelete=async (e)=>{
    if(window.confirm("Are You Sure ??")==true)
    try{
      const res=await axios.delete("http://localhost:8866/backend/client/"+e);
      window.location.reload();
    }
    catch(err){
      alert(err);
    }
  }

    const navigate=useNavigate();

    const client=()=>{
        navigate("/Add_client");
    }

    $(document).ready(function () {
      setTimeout(function(){
      $('#example').DataTable(
          {
              "bDestroy": true,
              pagingType: 'full_numbers',
              pageLength: 10,
              processing: true,
              dom: 'Bfrtip',
                  buttons: ['copy', 'csv', 'print'
                  ]
          }
      );
      } ,
      1000
      );
  });

  return (
    <div>
      <main id="main" class="main">
        <div class="col-12">
           <div class="card">
              <div class="card-body">
                  <h5 class="card-title">Manage Client</h5>
        
                  <div class="col-12">
                        <button type='button' class="btn btn-primary float-start mb-3 rounded-pill" onClick={client}><i class="bi bi-person-plus"></i><b> Add Client</b></button>
                  </div>   
        
                  <table id="example" class="table table-striped dt-responsive nowrap w-100">
                  <thead>
                        <tr>
                            <th>Sr no</th>
                            <th>Client Name</th>
                            <th>Mobileno</th>
                            <th>Email</th>
                            <th>Dob</th>
                            <th>Age</th>
                            <th>Action</th>
                            <th>Address</th>
                            <th>Status</th>                            
                        </tr>
                  </thead>
                
                  <tbody>
                      {clients.map((client)=>
                            <tr>  
                                  <td>{i++}</td>
                                  <td>{client.client_name}</td>
                                  <td>{client.mobile_no}</td>
                                  <td>{client.email}</td>
                                  <td>{client.dob}</td>
                                  <td>{client.age}</td>
                                  <td>
                                        <button type="submit" class="btn btn-primary rounded-pill" style={{marginRight: '10px'}}><Link to={"/Add_client/"+client.client_id} style={{color:'white'}}>Edit</Link></button>
                                        <button type="submit" class="btn btn-danger rounded-pill" onClick={(e)=>handledelete(client.client_id)}>Delete</button>
                                  </td>
                                  <td>{client.address} , {client.city} , {client.country}</td>
                                  <td>{client.status == 1? 'Active' : 'Inactive'}</td>                                 
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
