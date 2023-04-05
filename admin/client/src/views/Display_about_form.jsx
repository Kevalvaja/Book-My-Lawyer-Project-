import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navigate, useNavigate } from 'react-router-dom';
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


export default function Display_about_form() {

    const[abouts,setabout]=useState([]);
    let i=1;


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

    // const handledelete=async (e)=>{
    //   if(window.confirm("Are You Sure ??")==true)
    //   try
    //   {
    //           const res=await axios.delete("http://localhost:8866/backend/about/"+e);
    //           window.location.reload();
    //   }
    //   catch(err)
    //   {
    //           alert(err);
    //   }
    // }


    // const navigate=useNavigate();

    // Add Button Code
    // const About_us=()=>{
    //           navigate("/About_form");
    // }



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
            <div class="col-12" style={{width:"100%"}}>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Manage About Us</h5>

                        {/* Add Button Code */}
                        {/* <div class="col-12">
                              <button type='button' class="btn btn-outline-primary float-start mb-3 rounded-pill" onClick={About_us}><i class="bi bi-person-plus"></i><b> About_us</b></button>
                        </div>    */}

                        <table id="example" class="table table-striped dt-responsive nowrap w-100">
                        
                                <thead>
                                        <tr>
                                              <th>Action</th>
                                              <th>#</th>
                                              <th>Image</th>
                                              <th>Description</th>
                                              <th>Entry By</th>
                                        </tr>
                                </thead>
                                <tbody>
                                         {abouts.map((about)=>
                                             <tr>
                                                  <td>
                                                      <button type="submit" class="btn btn-outline-primary rounded-pill"><Link to={"/About_form/"+about.about_id}><i class="ri-draft-line" title='Update'></i></Link></button >   
                                                      {/* <button type="submit" class="btn btn-outline-danger rounded-pill" onClick={(e)=>handledelete(about.about_id)}><i class="ri-delete-bin-line" title='Delete'></i></button> */}
                                                  </td>
                                                  <th>{i++}</th>
                                                  <td><img src={`../upload/${about.image}`} width={100} height={100}></img></td>
                                                  <td>{about.description}</td>
                                                  <td>{about.entry_by}</td>
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
