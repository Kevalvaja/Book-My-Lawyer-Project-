import React,{useState,useEffect} from 'react'
import axios from "axios";

//Datatable Modules
import "../../node_modules/datatables.net-dt/js/dataTables.dataTables";
import "../../node_modules/datatables.net-dt/css/jquery.dataTables.min.css";
import "../../node_modules/datatables.net-buttons/js/dataTables.buttons.js";
import "../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../node_modules/datatables.net-buttons/js/buttons.flash.js";
import "../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../node_modules/datatables.net-buttons/js/buttons.print.js";
import $ from 'jquery';
import { Link } from 'react-router-dom';

export default function Display_lawyer() {

    const Id = sessionStorage.getItem("user");
    const role = sessionStorage.getItem("role");

    const [Inquirys,setInquirys]=useState([]); //Define array useState
    let i = 1;

    useEffect(()=>{
        fatchInquiry(); //Call fatchInquiry Function
    },[]);

    /* Define fatchInquiry function */
    const fatchInquiry=async()=>{
        if(role == 1)
        {
            try{
                const res = await axios.get("http://localhost:8866/backend/join_query_inquiry");
                setInquirys(res.data);
            }
            catch(err){
                alert(err);
            }
        }
        else
        {
            try{
                const res = await axios.get("http://localhost:8866/backend/join_query_inquiry/" + Id);
                setInquirys(res.data);
            }
            catch(err){
                alert(err);
            }
        }
    }

    /* Define Delete button click event */
    const handledelete = async(e)=>{
        if(window.confirm("Are you sure ?") == true)
        try{
            const res = await axios.delete("http://localhost:8866/backend/replay_inquiry/"+e)
            alert(res.data);
            window.location.reload();
        }
        catch(err){
            alert(err);
        }
    }

    /* Data dependency */
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
    {role>0 && role<2? (
        <main id="main" class="main">
        <div class="col-12">
        <div class="card col-12">
        <div class="card-body">
            <h5 class="card-title">Manage Inquiry</h5>                        
                        <table id="example" class="table table-striped dt-responsive nowrap w-100">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Lawyer Name</th>
                            <th scope="col">Inquiry Title</th>
                            <th scope="col">Inquiry Date</th>
                            <th scope="col">Action</th>  
                            <th scope="col">Message</th>
                            <th scope="col">Reply Inquiry</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                    {Inquirys.map((Inquiry)=>                            
                        <tr>
                            <th scope="row">{i++}</th>
                            <td>{Inquiry.client_id == ''? "-" : Inquiry.client_name}</td>
                            <td>{Inquiry.lawyer_id == ''? "-" : Inquiry.name}</td>
                            <td>{Inquiry.inquiry_title}</td>
                            <td>{Inquiry.inquiry_date}</td>
                            <td>
                            <Link to={`/Replay_inquiry/${Inquiry.inquiry_id}`} style={{ marginRight: "10px" }} class="btn btn-primary rounded-pill">
                                                                        Reply Inquiry </Link>
                            <button type='submit' class='btn btn-danger rounded-pill' onClick={(e) => handledelete(Inquiry.inquiry_id)}>Delete</button>
                            </td>
                            <td>{Inquiry.message}</td>
                            <td>{Inquiry.replay_inquiry}</td>
                            <td>{Inquiry.status == 1? "Active" : "Inactive"}</td>
                        </tr>
                    )}
                        </tbody>
                    </table>
        </div>
        </div>
        </div>
        </main>
    ):role>0 && role<3? (
        <main id="main" class="main">
        <div class="col-12">
        <div class="card col-12">
        <div class="card-body">
            <h5 class="card-title">Manage Inquiry</h5>                        
                        <table id="example" class="table table-striped dt-responsive nowrap w-100">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Inquiry Title</th>
                            <th scope="col">Inquiry Date</th>
                            <th scope="col">Action</th>  
                            <th scope="col">Message</th>
                            <th scope="col">Reply Inquiry</th>
                            <th scope="col">Reply Inquiry Date</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                    {Inquirys.map((Inquiry)=>                            
                        <tr>
                            <th scope="row">{i++}</th>
                            <td>{Inquiry.client_id == ''? "-" : Inquiry.client_name}</td>
                            <td>{Inquiry.inquiry_title}</td>
                            <td>{Inquiry.inquiry_date}</td>
                            <td>
                            <Link to={`/Replay_inquiry/${Inquiry.inquiry_id}`} style={{ marginRight: "10px" }} class="btn btn-primary rounded-pill">
                                                                        Reply Inquiry </Link>
                            <button type='submit' class='btn btn-danger rounded-pill' onClick={(e) => handledelete(Inquiry.inquiry_id)}>Delete</button>
                            </td>
                            <td>{Inquiry.message}</td>
                            <td>{Inquiry.replay_inquiry}</td>
                            <td>{Inquiry.update_date}</td>
                            <td>{Inquiry.status == 1? "Active" : "Inactive"}</td>
                        </tr>
                    )}
                        </tbody>
                    </table>
        </div>
        </div>
        </div>
        </main> 
    ):("")}
        
    </div>
  )
}
