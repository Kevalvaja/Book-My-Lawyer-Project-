import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Link, navigate, useLocation, useNavigate } from 'react-router-dom';

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



export default function Display_blog() {
  const role = sessionStorage.getItem("role");
  const[blogs,setblog]=useState([]);
  let i=1;


  useEffect(()=>{
    fatchblog();
  },[]);


  const fatchblog=async()=>{
    if(role == 1)
    {
      try
      {
        const res=await axios.get("http://localhost:8866/backend/join_blog");
        setblog(res.data);
      }
      catch(err)
      {
        alert(err);
      }
    }
    else
    {
      const id = sessionStorage.getItem("user");
      try
      {
        const res=await axios.get("http://localhost:8866/backend/lawyer_blog/" + id);
        setblog(res.data);
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
            const res=await axios.delete("http://localhost:8866/backend/blog/"+e);
            window.location.reload();
    }
    catch(err)
    {
            alert(err);
    }
  }


    const navigate=useNavigate();


    const blog=()=>{
                      navigate("/blog");
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
              <h5 class="card-title">Manage Blog</h5>

                <div class="col-12">
                      <button type='button' class="btn btn-primary float-start mb-3 rounded-pill" onClick={blog}><i class="bi bi-person-plus"></i><b> Blog</b></button>
                </div>

                <table id="example" class="table table-striped dt-responsive nowrap w-100">
                <thead>
                  <tr>                      
                      <th>#</th>
                      <th>Lawyer name</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Action</th>
                      <th>Description</th>
                      <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                      {blogs.map((blog)=>(
                           <tr>
                                <th>{i++}</th>
                                <td>{blog.name}</td>
                                <td><img src={`../upload/${blog.blog_image}`} width={100} height={100}></img></td>
                                <td>{blog.blog_title}</td>
                                <td>
                                    <button type="submit" class="btn btn-primary rounded-pill" style={{marginRight: "10px"}}><Link to={"/blog/"+blog.blog_id} style={{color: 'white'}}>Edit</Link></button>
                                    {/* <Link to={`/Display_blog/${blog.blog_id}`} class="btn btn-outline-primary rounded-pill"><i class="ri-draft-line" title='Update'></i></Link> */}
                                    <button type="submit" class="btn btn-danger rounded-pill" onClick={(e)=>handledelete(blog.blog_id)}>Delete</button>
                                </td>
                                <td>{blog.blog_desc}</td> 
                                <td>{blog.status == 1? "Active" : "Inactive" }</td>
                           </tr>
                      ))}                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
