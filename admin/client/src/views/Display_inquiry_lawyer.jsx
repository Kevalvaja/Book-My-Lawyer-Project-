import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

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
import axios from 'axios';



export default function Display_inquiry_lawyer() {

  const role = sessionStorage.getItem("role");
  const Id = sessionStorage.getItem("user");
  const [display_inquiry,setDisplay_Inquiry] = useState([]);
  var i = 1
  useEffect(()=>{
    if(role == 2 && Id)
    {
      Display_inquiry();
    }
  })

  const Display_inquiry = async() => {
    try{
      const res = await axios.get("http://localhost:8866/backend/add_inquiry_lawyer/" + Id);
      setDisplay_Inquiry(res.data);
    }
    catch(err){
      alert(err);
    }
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

    const btndelete = async(e) => {
      try{
        var text = "Are you sure ?";
        if(window.confirm(text) == true)
        { 
          const res = await axios.delete("http://localhost:8866/backend/replay_inquiry/" + e);
          alert(res.data);
          window.location.reload();
        }
      }
      catch(err){
        alert(err);
      }
    }
  
  return (
    <div>
      <main id="main" class="main">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Display Inquiry</h5>
              <div class="col-12">
                      <button type='button' class="btn btn-primary float-start mb-3 rounded-pill"><i class="bi bi-person-plus"></i><Link to="/inquiry" style={{color:"white"}}><b>Add Inquiry</b></Link></button>
                </div>
                <table id="example" class="table table-striped dt-responsive nowrap w-100">
                <thead>
                  <tr>                      
                      <th>#</th>
                      <th>Lawyer name</th>
                      <th>Inquiry Title</th>
                      <th>Inuiry Date</th>
                      <th>Message</th>
                      <th>Replay Inquiry</th>
                      <th>Action</th>
                      <th>Replay Inquiry Date</th>
                  </tr>
                </thead>

                <tbody>
                  {display_inquiry.map((inquiry)=>
            
                        <>
                           <tr>
                                <th>{i++}</th>
                                <td>{inquiry.name}</td>
                                <td>{inquiry.inquiry_title}</td>
                                <td>{inquiry.inquiry_date}</td>
                                <td>{inquiry.message}</td> 
                                <td>{!inquiry.replay_inquiry? <p style={{color:'red'}}>Under Process..</p> : inquiry.replay_inquiry}</td>
                                <td>
                                  <Link to={"/inquiry/" + inquiry.inquiry_id} style={{color:'white'}}><button type="submit" className='btn btn-primary rounded-pill' style={{marginRight: "10px"}}>Edit</button></Link>
                                  <button type="submit" className='btn btn-danger rounded-pill' onClick={(e)=>btndelete(inquiry.inquiry_id)}>Delete</button>
                                </td>
                                <td>{!inquiry.update_date? <p style={{color:'red'}}>Under Process..</p> : inquiry.update_date}</td>
                           </tr>
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

