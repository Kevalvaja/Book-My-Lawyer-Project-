import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Header() {
    const [admin_name,setName] = useState('');
    const [image,setImage] = useState('');
    const [admin_id,setAdmin_id] = useState(sessionStorage.getItem("user"));
    const navigate = useNavigate();

    const role = sessionStorage.getItem("role");

    useEffect(()=>{
        fetchadmin();
        if(!admin_id)
        {
            navigate("/");
            window.location.reload();
        }
    },[admin_id])
    
    const fetchadmin = async() => {
        if(role == 1)
        {
            try{
                const res = await axios.get("http://localhost:8866/backend/admin/" + admin_id);
                setName(res.data.admin_name);
                setImage(res.data.admin_image);
            }
            catch(err){
                alert(err);
            }
        }
        else
        {
            try{
                const res = await axios.get("http://localhost:8866/backend/lawyer/" + admin_id);
                setName(res.data.name);
                setImage(res.data.image);
            }
            catch(err){
                alert(err);
            }
        }
        
    }

    const singOut = async() =>{
        sessionStorage.clear();
        setAdmin_id("");
    }
    
return (
    <div>
    {role>0 && role<2 ? (
        <header id="header" class="header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
        <Link to="/" class="logo d-flex-end align-items-center">
            <img src="assets/img/logo.png" width={240} height={240} alt=""/>
            
        </Link>
        <Link to="/">
            <i class="bi bi-list toggle-sidebar-btn"></i>
        </Link>
        </div>
        
        <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">
    
            <li class="nav-item dropdown pe-3">
    
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={`../upload/${image}`} alt="Profile" class="rounded-circle"/>
                <span class="d-none d-md-block dropdown-toggle ps-2">{admin_name}</span>
            </a>
    
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                <h6>{admin_name}</h6>
                <span>Admin</span>
                </li>
                <li>
                <hr class="dropdown-divider"/>
                </li>
    
                <li>
                <Link class="dropdown-item d-flex align-items-center" to="/Admin_profile">
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                </Link>
                </li>
                <li>
                <hr class="dropdown-divider"/>
                </li>
    
                <li>
                <button class="dropdown-item d-flex align-items-center" type="submit" onClick={singOut}>
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </button>
                </li>
    
            </ul>
            </li>
    
        </ul>
        </nav>
        </header>
    ): role>0 && role<3 ? (
        <header id="header" class="header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
        <Link to="/" class="logo d-flex-end align-items-center">
            <img src="assets/img/logo.png" width={240} height={240} alt=""/>
            
        </Link>
        <Link to="/">
            <i class="bi bi-list toggle-sidebar-btn"></i>
        </Link>
        </div>
        
        <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">
    
            <li class="nav-item dropdown pe-3">
    
            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={`../upload/${image}`} alt="Profile" class="rounded-circle"/>
                <span class="d-none d-md-block dropdown-toggle ps-2">{admin_name}</span>
            </a>
    
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                <h6>{admin_name}</h6>
                <span>Lawyer</span>
                </li>
                <li>
                <hr class="dropdown-divider"/>
                </li>
    
                <li>
                <Link class="dropdown-item d-flex align-items-center" to="/Admin_profile">
                    <i class="bi bi-person"></i>
                    <span>My Profile</span>
                </Link>
                </li>
                <li>
                <hr class="dropdown-divider"/>
                </li>
    
                <li>
                <button class="dropdown-item d-flex align-items-center" type="submit" onClick={singOut}>
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </button>
                </li>
    
            </ul>
            </li>
    
        </ul>
        </nav>
        </header>
    ):("")}
    
    </div>
  )
}
