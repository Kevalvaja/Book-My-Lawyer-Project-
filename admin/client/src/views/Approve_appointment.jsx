import React from 'react'
import axios from 'axios';
import { Link, useNavigate,useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
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


export default function Approve_appointment() {

  const role = sessionStorage.getItem("role");
  const id = sessionStorage.getItem("user");
  const entry_by = id;
  const location = useLocation();
  const a_id = location.pathname.split("/")[2];
  const[appointments,setappointment]=useState([]);
  const[case_status,setCase_status]=useState(2);
  let i=1; 


  useEffect(()=>{
    fatchuser();
  },[]);

  /* Update Client Appointment status */
  const update_caseStatus = async(id,case_status) => {
    try{
      const res = await axios.put("http://localhost:8866/backend/client_appointment_status/" + id ,{
        case_status,
        entry_by
      })
      alert(res.data);
      if(case_status == 1)
      {
        navigate("/Display_client_appointment");
      }
      else
      {
        navigate("/Disapprove_appoinment");
      }
      window.location.reload();
    }
    catch(err){
      alert(err);
    }
  }  

  const fatchuser=async()=>{
    if(role == 1)
    {
      try
      {
                const res=await axios.get("http://localhost:8866/backend/join_client_appointment");
                setappointment(res.data);
      }
      catch(err)
      {
                alert(err);
      }
    }
    else
    {
      try
      {
                const res=await axios.get("http://localhost:8866/backend/join_client_appointment/" + id);
                setappointment(res.data);
      }
      catch(err)
      {
                alert(err);
      }
    }
    
  }

  const handledelete=async(e)=>{
    if(window.confirm("Are You Sure ??")==true)
    try
    {
              const res=await axios.delete("http://localhost:8866/backend/client_appointment/"+e);
              window.location.reload();
    }
    catch(err)
    {
              alert(err);
    }
  }

    const navigate=useNavigate();


    const client_appointment=()=>{
        navigate("/Client_appointment");
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
                <h5 class="card-title">Manage Client Appoinetment</h5>

                <div class="col-12">
                      <button type='button' class="btn btn-primary float-start mb-3 rounded-pill" onClick={client_appointment}><i class="bi bi-person-plus"></i><b> Client Appointment</b></button>
                      <Link to="/Approve_appointment" class="btn btn-success float-start mb-3 rounded-pill" style={{marginLeft: "10px"}}><i class="bi bi-person-plus"></i><b> Approve Appointment</b></Link>
                      <Link to="/Disapprove_appoinment" class="btn btn-secondary float-start mb-3 rounded-pill" style={{marginLeft: "10px"}}><i class="bi bi-person-plus"></i><b> Disapprove Appointment</b></Link>
                      <Link to="/Display_client_appointment" class="btn btn-danger float-start mb-3 rounded-pill" style={{marginLeft: "10px"}}><i class="bi bi-person-plus"></i><b> Pending Appointment</b></Link>
                </div>   

                <table id="example" class="table table-striped dt-responsive nowrap w-100">
                
                <thead>
                        <tr>
                            <th>#</th>
                            <th>Client Name</th>
                            <th>Lawyer Name</th>
                            <th>Appointment Title</th>
                        {role>1 && role<3 ? <th>Case Status</th> : ""}
                            <th>Action</th>
                            <th>Appointment Date</th>
                            <th>Message</th>
                            <th>Gender</th>
                            <th>Case Category</th>
                            <th>Status</th>
                        </tr>
                </thead>
               
                <tbody>
                    {appointments.map((appointment)=>
                      <>
                        {appointment.case_status>1 && appointment.case_status<3 ?  
                        <tr>
                           
                            <th>{i++}</th>
                            <td>{appointment.client_name}</td>
                            <td>{appointment.name}</td>
                            <td>{appointment.appointment_title}</td>
                            <td>
                            {role>1 && role<3 ? 
                            <div class="col-md-6">
                                      {case_status>1 && case_status<3 ?
                                      <>
                                        <button type="submit" class="btn btn-danger rounded-pill" style={{marginRight: "10px"}} onClick={()=>update_caseStatus(appointment.appointment_id,1)}>Pending</button>
                                        <button type="submit" class="btn btn-secondary rounded-pill" onClick={()=>update_caseStatus(appointment.appointment_id,3)}>Disapprove</button>
                                      </>
                                      :""}
                                  </div>
                            : ""}
                            </td>
                            <td>
                                {role>0 && role<2 ? <button type="submit" class="btn btn-primary rounded-pill" style={{marginRight:'10px'}}><Link to={"/Client_appointment/"+appointment.appointment_id} style={{color:'white'}}>Edit</Link></button> :""}
                                <button type="submit" class="btn btn-danger rounded-pill" onClick={(e)=>handledelete(appointment.appointment_id)}>Delete</button>
                            </td>
                            <td>{appointment.appointment_date2}</td>
                            <td>{appointment.message}</td>
                            <td>{appointment.gender>0 && appointment.gender<2 ? "Male" : 
                            appointment.gender>0 && appointment.gender<3 ? "Female" : ""}</td>
                            <td>{appointment.category_name}</td>
                            <td>{appointment.status == 1? "Active" : "Inactive" }</td>
                        </tr>
                      : ""}
                      </>
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

