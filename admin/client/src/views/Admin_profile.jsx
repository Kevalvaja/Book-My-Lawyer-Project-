import React,{useState,useEffect} from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";

export default function Admin_profile() {

    const navigate = useNavigate();
    const role = sessionStorage.getItem("role");
    const AdminId = sessionStorage.getItem("user");
    const entry_by = AdminId;
    // Admin Profile
    const [Admins,setAdmins] = useState([]); //Define array useState
    const [admin_name,setAdmin_name] = useState('');
    const [email,setEmail] = useState('');
    const [image,setImage] = useState('');
    const [mobile_no,setMobileno] = useState('');
    const [status,setStatus]  = useState('');
    const [password,setPassword] = useState('');
    const [password1,setPassword1] = useState('');

    // Lawyer Profile
    const [lawyer,setLawyer] = useState([]);
    const [name,setName] = useState('');
    const [image1,setImage1] = useState('');
    const [mobile_no2,setMobileno2] = useState('');
    const [email2,setEmail2] = useState('');
    const [age,setAge] = useState('');
    const [dob,setDob1] = useState(''); 
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [status1,setStatus1] = useState('');

    const [formerror,setFormerror] = useState({});

    

    useEffect(()=>{
        if(role == 1)
        {
            fetchadmin(); //Call fatchAdmin Function
            Admin_record();
        }
        else
        {
            fetchlawyer();
            lawyer_record();
        }
        
    },[]);


    /* Image Upload */
    const upload = async() =>{
            try{
                if(image1)
                {
                    const formData = new FormData();
                    formData.append("file",image1);
                    const res = await axios.post("http://localhost:8866/backend/upload",formData);
                    if(role == 1)
                    {
                        edit_profile(res.data);
                    }
                    else
                    {
                        edit_lawyer_profile(res.data);
                    }
                }
                // else
                // {
                //     if(role == 1)
                //     {
                //         edit_profile();
                //     }
                // }
                
            }
            catch(err){
                alert(err);
            }
    }

    const validation = () => {
        const error = {}
        if(role == 1)
        {
            if(!admin_name)
            {
                error.admin_name = "Name is Required";
            }
            if(!email)
            {
                error.email = "Email-id is Required";
            }
            if(!mobile_no)
            {
                error.mobile_no = "Mobile number is Required";
            }
            if(!image || image)
            {
                upload();
            }
            if(!password && !password1)
            { 
              error.password = "Please enter password and confirm password";
            }
            else if(!password)
            {
              error.password = "Please enter  password";
            }
            else if(password.length<8)
            {
                error.password = "Please enter atleast 8 Character";
            }
            else if(!password1)
            {
              error.password1 = "Please enter confirm password";
            }
            if(password != password1)
            {
              error.password1 = "Password and confirm password are not same";
            }

        }
        else
        {
            if(!name)
            {
                error.name = "Name is Required";
            }
            if(!mobile_no)
            {
                error.mobile_no = "Email-id is Required";
            }
            if(!mobile_no2)
            {
                error.mobile_no2 = "Mobile number is Required";
            }
            if(!email)
            {
                error.email = "Email-Id is Required";
            }
            if(!email2)
            {
                error.email2 = "Email-Id is Required";
            }
            if(!age)
            {
                error.age = "Age is Required";
            }
            if(!dob)
            {
                error.dob = "Email-Id is Required";
            }
            if(!password && !password1)
            {
                error.password = "New Password and Confirm Password are Required";
            }
            else if(!password)
            {
                error.password = "New Password are Required";
            }
            else if(!password1)
            {
                error.password1 = "Confirm Password are Required";
            }
            else if(password.length <8)
            {
                error.password1 = "Please enter atleast 8 Character";
            }
            // if(!image1 || image1)
            // {
            //     upload();
            // }
        }
        
        return error;
    }

    /* Define fatchAdmin function */
    const fetchadmin = async() => {
        try{
            const res = await axios.get("http://localhost:8866/backend/admin");
            setAdmins(res.data);
        }
        catch(err){
            alert(err);
        }
    }

    const Admin_record = async(e) => {
        try{
            const res = await axios.get("http://localhost:8866/backend/admin/"+AdminId);
            setAdmin_name(res.data.admin_name);
            setEmail(res.data.email);
            setMobileno(res.data.mobile_no);
            setStatus(res.data.status);
            setImage(res.data.admin_image);
        }
        catch(err){
            alert(err);
        }
    }

    const edit_profile = async(admin_image) => {
        try{
            const res = await axios.put("http://localhost:8866/backend/admin/" + AdminId ,{
                admin_name,
                email,
                mobile_no,
                admin_image
            })
            alert(res.data);
            navigate("/admin_profile");
        }
        catch(err){
            alert(err);
        }
    }

    const edit_lawyer_profile = async(image) => {
            try{
                const res = await axios.put("http://localhost:8866/backend/lawyer_profile/" + AdminId ,{
                    name,
                    image,
                    mobile_no,
                    mobile_no2,
                    email,
                    email2,
                    age,
                    dob,
                    address,
                    city,
                    state,
                    entry_by
                })
                alert(res.data);
                navigate("/admin_profile");
            }
            catch(err){
                alert(err);
            }
    }   

    const btnhandle = async(e) => {
        e.preventDefault();
        if(role == 1)
        {
            try{
                setFormerror(validation());
                if(admin_name && email && mobile_no)
                {
                    upload();
                }
            }
            catch(err){
                alert(err);
            }
        }
        else
        {
            try{
                setFormerror(validation());
                if(name && image && mobile_no && mobile_no2 && email && email2 && age && dob && address && city && state && country && status1 && entry_by)
                {
                    upload();
                }
            }
            catch(err){
                alert(err);
            }
        }
    }

    const change_password = async(e) => {
        e.preventDefault();
        setFormerror(validation());
        if(password && password1 && password.length >=8 && password1.length >=8 && password == password1)
        {
            if(role == 1)
            {
                try{
                    if(password.length >= 8 && password1.length >= 8)
                    {
                        const res = await axios.put("http://localhost:8866/backend/changepass_admin/" + AdminId ,{
                            password,
                            entry_by
                    })
                    alert(res.data);
                    navigate("/admin_profile");
                    window.location.reload();
                    }
                    else
                    {
                        setFormerror(validation());
                    }
                }
                catch(err){
                    alert(err);
                }
            }
            else
            {
                try{
                    if(password == password1)
                    {
                        const res = await axios.put("http://localhost:8866/backend/changepass_lawyer/" + AdminId ,{
                            password,
                            entry_by
                        })
                        alert(res.data);
                        navigate("/admin_profile");
                        window.location.reload();
                    }
                    else
                    {
                        setFormerror(validation());
                    }
                }
                catch(err){
                    alert(err);
                }
            }
        
        }
        else
        {
            setFormerror(validation());
        }
    }


    //Fetch Lawyer
    const fetchlawyer = async() => {
        try{
            const res = await axios.get("http://localhost:8866/backend/lawyer");
            setLawyer(res.data);
        }
        catch(err){
            alert(err);
        }
    }

    const lawyer_record = async(e) => {
        try{
            const res = await axios.get("http://localhost:8866/backend/lawyer/"+AdminId);
            setName(res.data.name);
            setImage(res.data.image);
            setMobileno(res.data.mobile_no);
            setMobileno2(res.data.mobile_no2);
            setEmail(res.data.email);
            setEmail2(res.data.email2);
            setAge(res.data.age)
            setDob1(res.data.dob2);
            setAddress(res.data.address);
            setCity(res.data.city);
            setState(res.data.state);
            setCountry(res.data.country);
            setStatus1(res.data.status);
        }
        catch(err){
            alert(err);
        }
    }

  return (
    <div>
        {/* Admin Profile */}
        {role>0 && role<2 ? (
            <main id="main" class="main">

            <div class="pagetitle">
            <h1>Admin Profile</h1>
            </div>

            <section class="section profile">
            <div class="row">
                <div class="col-xl-4">

                <div class="card">
                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center"> 
                    <img src={`../upload/${image}`} alt="Profile" class="rounded-circle"/>
                    <h2>{admin_name}</h2>
                    <h3>Admin</h3>
                    </div>
                </div>

                </div>

                <div class="col-xl-8">

                <div class="card">
                    <div class="card-body pt-3">
                    
                    <ul class="nav nav-tabs nav-tabs-bordered">

                        <Link to={"/Admin_profile"}>
                        <li class="nav-item">
                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                        </li>
                        </Link>

                        <Link to={"/Admin_profile/" + AdminId}>
                        <li class="nav-item">
                            <button type="submit" class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                        </li>
                        </Link>

                        <Link to={"/Admin_profile/" + AdminId}>
                        <li class="nav-item">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                        </li>
                        </Link>

                    </ul>
                    <div class="tab-content pt-2">

                        <h5 class="card-title">Profile Details</h5>

                        <div class="tab-pane fade show active profile-overview" id="profile-overview">
                    
                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Email</div>
                            <div class="col-lg-9 col-md-8">{email}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Mobile no</div>
                            <div class="col-lg-9 col-md-8">{mobile_no}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Status</div>
                            <div class="col-lg-9 col-md-8">{status == 1? "Active" : "Inactive"}</div>
                        </div>

                        </div>

                        <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
                    
                        <form>
                            <div class="row mb-3">
                            <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                            <div class="col-md-8 col-lg-9">
                                <img src={`../upload/${image}`} alt="Profile"/>
                            
                                <div class="pt-2">
                                    <input type="file" class="form-control" accept="image/png, image/jpeg" onChange={(e)=>setImage1(e.target.files[0])}></input>
                                </div>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="fullName" type="text" class="form-control" id="fullName" defaultValue={admin_name} onChange={(e)=>setAdmin_name(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.admin_name}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="about" class="col-md-4 col-lg-3 col-form-label">Email</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="email" type="email" class="form-control" id="fullName" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.email}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="company" class="col-md-4 col-lg-3 col-form-label">Mobile no</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="text" type="number" class="form-control" id="company" defaultValue={mobile_no} onChange={(e)=>setMobileno(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.mobile_no}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="Job" class="col-md-4 col-lg-3 col-form-label">Status</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="status" type="text" class="form-control" id="Job" defaultValue={status == 1? "Active" : ""} disabled/>
                            </div>
                            </div>

                            
                            <div class="text-center">
                            <button type="submit" class="btn btn-primary rounded-pill" onClick={btnhandle}><b>Save Changes</b></button>
                            </div>
                        </form>

                        </div>

                        <div class="tab-pane fade pt-3" id="profile-change-password">
                        
                        <form>

                            <div class="row mb-3">
                            <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="newpassword" type="password" class="form-control" id="newPassword" onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="renewpassword" type="password" class="form-control" id="renewPassword" onChange={(e)=>setPassword1(e.target.value)}/>
                            </div>
                            </div>
                            <p class='text-center' style={{color:'red'}}>{formerror.password}</p>
                            <p class='text-center' style={{color:'red'}}>{formerror.password1}</p>
                            <div class="text-center">
                            <button type="submit" class="btn btn-primary rounded-pill" onClick={change_password}><b>Change Password</b></button>
                            </div>
                        </form>

                        </div>

                    </div>

                    </div>
                </div>

                </div>
            </div>
            </section>

            </main>
        ):
        // Lawyer Profile
        role>0 && role<3 ?(
            <main id="main" class="main">

            <div class="pagetitle">
            <h1>Lawyer Profile</h1>
            </div>

            <section class="section profile">
            <div class="row">
                <div class="col-xl-4">

                <div class="card">
                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center"> 
                    <img src={`../upload/${image}`} alt="Profile" class="rounded-circle"/>
                    <h2>{name}</h2>
                    <h3>Lawyer</h3>
                    </div>
                </div>

                </div>

                <div class="col-xl-8">

                <div class="card">
                    <div class="card-body pt-3">
                    
                    <ul class="nav nav-tabs nav-tabs-bordered">

                        <Link to={"/Admin_profile"}>
                        <li class="nav-item">
                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                        </li>
                        </Link>

                        <Link to={"/Admin_profile/" + AdminId}>
                        <li class="nav-item">
                            <button type="submit" class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                        </li>
                        </Link>

                        <Link to={"/Admin_profile/" + AdminId}>
                        <li class="nav-item">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                        </li>
                        </Link>

                    </ul>
                    <div class="tab-content pt-2">

                        <h5 class="card-title">Profile Details</h5>

                        <div class="tab-pane fade show active profile-overview" id="profile-overview">
                    
                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Mobile no</div>
                            <div class="col-lg-9 col-md-8">{mobile_no}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Mobile no2</div>
                            <div class="col-lg-9 col-md-8">{mobile_no2}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Email-Id</div>
                            <div class="col-lg-9 col-md-8">{email}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Email-Id2</div>
                            <div class="col-lg-9 col-md-8">{email2}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Age</div>
                            <div class="col-lg-9 col-md-8">{age}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Date of Birth</div>
                            <div class="col-lg-9 col-md-8">{dob}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Address</div>
                            <div class="col-lg-9 col-md-8">{address},{city},{state},{country}</div>
                        </div>

                        <div class="row">
                            <div class="col-lg-3 col-md-4 label">Status</div>
                            <div class="col-lg-9 col-md-8">{status1 == 1? "Active" : "Inactive"}</div>
                        </div>

                        </div>

                        <div class="tab-pane fade profile-edit pt-3" id="profile-edit">
                    
                        <form>
                            <div class="row mb-3">
                            <label for="profileImage" class="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                            <div class="col-md-8 col-lg-9">
                                <img src={`../upload/${image}`} alt="Profile"/>
                            
                                <div class="pt-2">
                                    <input type="file" class="form-control" accept="image/png, image/jpeg" onChange={(e)=>setImage1(e.target.files[0])}></input>
                                </div>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Full Name</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="fullName" type="text" class="form-control" id="fullName" defaultValue={name} onChange={(e)=>setAdmin_name(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.name}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="about" class="col-md-4 col-lg-3 col-form-label">Email-Id</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="email" type="email" class="form-control" id="fullName" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.email}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="about" class="col-md-4 col-lg-3 col-form-label">Email-Id2</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="email" type="email" class="form-control" id="fullName" defaultValue={email2} onChange={(e)=>setEmail2(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.email2}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="company" class="col-md-4 col-lg-3 col-form-label">Mobile no</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="text" type="number" class="form-control" id="company" defaultValue={mobile_no} onChange={(e)=>setMobileno(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.mobile_no}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="company" class="col-md-4 col-lg-3 col-form-label">Mobile no2</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="text" type="number" class="form-control" id="company" defaultValue={mobile_no2} onChange={(e)=>setMobileno2(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.mobile_no2}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="company" class="col-md-4 col-lg-3 col-form-label">Age</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="text" type="number" class="form-control" id="company" defaultValue={age} onChange={(e)=>setAge(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.age}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="company" class="col-md-4 col-lg-3 col-form-label">Date of Birth</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="text" type="date" class="form-control" id="company" value={dob} selected onChange={(e)=>setDob1(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.dob}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="company" class="col-md-4 col-lg-3 col-form-label">Address</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="text" type="text" class="form-control" id="company" defaultValue={address} onChange={(e)=>setAddress(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.address}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="company" class="col-md-4 col-lg-3 col-form-label">City</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="text" type="text" class="form-control" id="company" defaultValue={city} onChange={(e)=>setCity(e.target.value)} />
                                <p style={{color: "red"}}>{formerror.city}</p>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="company" class="col-md-4 col-lg-3 col-form-label">State</label>
                            <div class="col-md-8 col-lg-9">
                            <select name="state" id="state" class="form-select" value={state} select onChange={(e)=>setState(e.target.value)}>
                            <option selected>-select-</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            </select>
                          <p style={{color: 'red'}}>{formerror.state}</p>
                        </div>
                        </div>

                            <div class="row mb-3">
                            <label for="Job" class="col-md-4 col-lg-3 col-form-label">Status</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="status" type="text" class="form-control" id="Job" defaultValue={status1 == 1? "Active" : ""} disabled/>
                            </div>
                            </div>

                            
                            <div class="text-center">
                            <button type="submit" class="btn btn-primary rounded-pill" onClick={btnhandle}><b>Save Changes</b></button>
                            </div>
                        </form>

                        </div>

                        <div class="tab-pane fade pt-3" id="profile-change-password">
                        
                        <form>

                            <div class="row mb-3">
                            <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="newpassword" type="password" class="form-control" id="newPassword" onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            </div>

                            <div class="row mb-3">
                            <label for="renewPassword" class="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                            <div class="col-md-8 col-lg-9">
                                <input name="renewpassword" type="password" class="form-control" id="renewPassword" onChange={(e)=>setPassword1(e.target.value)}/>
                            </div>
                            </div>
                            <p class="text-center" style={{color:'red'}}>{formerror.password}</p>
                            <p class="text-center" style={{color:'red'}}>{formerror.password1}</p>
                            <div class="text-center">
                            <button type="submit" class="btn btn-primary rounded-pill" onClick={change_password}><b>Change Password</b></button>
                            </div>
                        </form>

                        </div>

                    </div>

                    </div>
                </div>

                </div>
            </div>
            </section>

            </main>
        ):("")}
        
    </div>
  )
}
