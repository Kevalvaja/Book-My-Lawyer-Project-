import React,{useState,useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom';
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

export default function Display_lawyer() {
    const navigate = useNavigate();

    /* Define Add button click event */
    const Add_lawyer_categoreis = () => {
        navigate('/Add_lawyer_categories');
    }

    const [categories,setCategories] = useState([]); //Define array useState
    let i = 1;

    useEffect(() => {
        fatchcategory(); //Call fatchcategory Function
    },[]);

    /* Define fatchcategory function */
    const fatchcategory = async() => {
        try{
            const res = await axios.get("http://localhost:8866/backend/category");
            setCategories(res.data);
            
        }   
        catch(err){
            alert(err);
        }
    }

    /* Define Delete button click event */
    const handledelete = async(e) => {
        if(window.confirm("Are you sure ?") == true)
        try{
            const res = await axios.delete("http://localhost:8866/backend/category/" + e);
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
        <main id="main" class="main">
            <div class="col-12">
            <div class="card col-12">
                <div class="card-body">
                    <h5 class="card-title">Manage Lawyer Categories</h5>

                        <div class="col-12">
                            <button type="button" class="btn btn-primary float-start mb-3 rounded-pill" onClick={Add_lawyer_categoreis}><i class="bi bi-person-plus"></i><b> Add lawyer category</b></button>
                        </div>
                        
                            <table id="example" class="table table-striped dt-responsive nowrap w-100">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Category Image</th>
                                    <th scope="col">Category Name</th>
                                    <th scope="col">Category Description</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>  
                                </tr>
                                </thead>
                                <tbody>
                            {categories.map((category) => 
                                <tr>
                                    <th scope="row">{i++}</th>
                                    <td><img src={`../upload/${category.category_image}`} width={100} height={100}></img></td>
                                    <td>{category.category_name}</td>
                                    <td>{category.description}</td>
                                    <td>{category.status == 1 ? "Active" : "Inactive"}</td>
                                    <td>
                                        <Link to={"/Add_lawyer_categories/" + category.category_id} style={{ marginRight: "10px" }} class="btn btn-primary rounded-pill">Edit</Link>
                                        <button type='submit' class='btn btn-danger rounded-pill' onClick={(e) => handledelete(category.category_id)}>Delete</button>
                                    </td>
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
