import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { format } from 'date-fns';
import moment from "moment";
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

export default function Display_lawyer() {
    const navigate = useNavigate();

    /* Define Add button click event */
    const Add_lawyer = () => {
        navigate('/Add_lawyer');
    }

    const[Lawyers,setLawyers] = useState([]); //Define array useState
    let i = 1;
    
    useEffect(() => {
        fatchLawyer(); //Call fatchLawyer Function
    },[]);

    /* Define fatchLawyer function */
    const fatchLawyer = async()=>{
        try{
            const res = await axios.get("http://localhost:8866/backend/join_query_lawyer");
            setLawyers(res.data);
        }
        catch(err){
            alert(err);
        }
    }

    
    /* Define Delete button click event */
    const handledelete = async(e) => {
        if(window.confirm("Are you sure ?") == true)
        try{
            const res = await axios.delete("http://localhost:8866/backend/lawyer/" + e);
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
                buttons: ['copy', 'csv', 'print'],
            }
        );
        } ,
        1000
        );
    });

  return (
    <div>
        <main id="main" className="main">
            <div className="col-12">
            <div className="card col-12">
                <div className="card-body">
                    <h5 className="card-title">Manage Lawyer</h5>

                        <div className="col-12">
                            <button type="button" className="btn btn-primary float-start mb-3 rounded-pill" onClick={Add_lawyer}><i className="bi bi-person-plus"></i><b> Add lawyer</b></button>
                        </div>
                            
                            <table id="example" className="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    
                                    <th scope="col">Lawyer Image</th>
                                    <th scope="col">Lawyer Name</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Mobile no</th>
                                    <th scope="col">Email-id</th>
                                    <th scope="col">Action</th>  
                                    <th scope="col">Dob</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Address</th> 
                                    
                                    <th scope="col">City</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Status</th>  
                                    
                                </tr>
                                </thead>
                                <tbody>
                            {Lawyers.map((lawyer)=>
                            
                                <tr>
                                    <th>{i++}</th>
                                    
                                    <td><img src={`../upload/${lawyer.image}`} width={100} height={100}></img></td>
                                    <td>{lawyer.name}</td>
                                    <td>{lawyer.category_name}</td>      
                                    <td>{lawyer.mobile_no}</td>
                                    <td>{lawyer.email}</td>
                                    <td>
                                        <Link to={`/Add_lawyer/${lawyer.lawyer_id}`} style={{ marginRight: "10px" }} class="btn btn-primary rounded-pill">
                                                                                Edit </Link>
                                        <button class="btn btn-danger rounded-pill"  onClick={(e) => handledelete(lawyer.lawyer_id)}>Delete</button>
                                    </td>
                                    <td>{lawyer.dob2/*format(new Date(lawyer.dob), 'dd-MM-yyyy')*/} {/*moment(Date(lawyer.dob)).format("LT")*/}</td>
                                    <td>{lawyer.age}</td>
                                    <td>{lawyer.address}</td>
                                    <td>{lawyer.city}</td>
                                    <td>{lawyer.state}</td>
                                    <td>{lawyer.country}</td>
                                    <td>{lawyer.status == 1? 'Active' : 'Inactive'}</td>
                                    
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
