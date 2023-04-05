import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";
import { format } from 'date-fns';
export default function Add_lawyer() {

  const navigate = useNavigate();

 /* Define Back button click event */
  const Display_lawyer = () => {
    navigate('/Display_lawyer');
  }
  
  const[category_name,setCtype] = useState([]);
  
  /* Define Lawyer Table Field name */  
  const[category_id,setCategoryid]=useState('');
  const[name,setName]=useState('');
  const[image1,setImage]=useState('');
  const[image2,setImage2]=useState('');//second image variable declaration
  const[mobile_no,setMobile_no]=useState('');
  const[mobile_no2,setMobile_no2]=useState('');
  const[email,setEmail]=useState('');
  const[email2,setEmail2]=useState('');
  const[age,setAge]=useState('');
  
  
  const[dob,setDob]=useState('');
  const[address,setAddress]=useState('');
  const[city,setCity]=useState('');
  const[state,setState]=useState('');
  const[country,setCountry]=useState('india')
  const[password,setPassword]=useState('');
  const[status,setStatus]=useState('');
  const[entry_by,setEntry_by]=useState(1);

  const[formerror,setFormerror]=useState({});//Form validation variable
  
  /* Get Lawyer Id */
  const location=useLocation();
  const LawyerId=location.pathname.split("/")[2];

  useEffect(()=>{
    selectCategory();
    if(LawyerId)
    {
      displayLawyer(); 
    }
  },[])

  /* Define Update Lawyer Function */
  const displayLawyer = async()=>{
    try{
        const res = await axios.get("http://localhost:8866/backend/lawyer/"+LawyerId);
        // console.log(res.data)
        setCategoryid(res.data.category_id);
        setName(res.data.name);
        setImage2(res.data.image);
        setMobile_no(res.data.mobile_no);
        setMobile_no2(res.data.mobile_no2);
        setEmail(res.data.email);
        setEmail2(res.data.email2);
        setAge(res.data.age);
        setDob(res.data.dob);
        setAddress(res.data.address);
        setCity(res.data.city);
        setState(res.data.state);
        setCountry(res.data.country);
        setPassword(res.data.password);
        setStatus(res.data.status);
        setEntry_by(res.data.entry_by);
    }
    catch(err){
        alert(err);
    }
}

/* Upload Image */
  const upload = async() => {
    //alert(image1)
    if(image1!="")
    {
      try{
        const formData = new FormData();
        formData.append("file",image1);
        const res = await axios.post("http://localhost:8866/backend/upload",formData);
        insertData(res.data);
      }
      catch(err){
        alert(err);
      }
    }
    else
    {
      insertData(image2)
    }
    
  }
  
  
  /* Insert Data And Update Data */ 
  const insertData = async(image) => {
    const entry_by = 1;
    let res = "";
    
      if(!LawyerId)
      {
        if(password.length >= 8)
        {
          try{
            res = await axios.post("http://localhost:8866/backend/lawyer/",{
            category_id,
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
            country,
            password,
            status,
            entry_by
          })
          alert(res.data);
          navigate("/Display_lawyer")
          }
          catch(err){
            alert(err);
          }
        }
        else
        {
          setFormerror(validation());
        }
        
    }
    else
    {
      if(mobile_no.trim()!=mobile_no2.trim())
      {
        if(password.length >= 8)
        {
          try{
            res = await axios.put("http://localhost:8866/backend/lawyer/" + LawyerId,{
            name,
            category_id,
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
            country,
            password,
            status,
            entry_by
          })
            alert(res.data);
            navigate("/Display_lawyer")
          }
          catch(err){
            alert(err);
          }
        }
      }
      
    }
    //alert(res.data);
    //navigate("/Display_lawyer");
}

  /* Form validation Function */
  const validation = () => {
    const error = {};
    if(!name)
    {
      error.name = "Lawyer Name Required";
    }
    if(!category_id || category_id == 0)
    {
      error.category_id = "Please select Lawyer Category"
    }
    if(!status || status == 0)
    {
      error.status = "Please select Lawyer status"
    }
    var check_mno = document.getElementById("mno").value;
    var pattern = (/(0|91)?[6-9][0-9]{9}/);
    var IsValidno = pattern.test(check_mno);

    if(mobile_no || !mobile_no)
    {
      if(!mobile_no)
      {
        error.mobile_no = "Mobile number Required";
      }
      else if(IsValidno == false)
      {
        alert("Number is not valid");
      }
      else if(mobile_no==mobile_no2)
      {
        alert("Both number are same please enter differet number");   
      }
      else if(mobile_no && mobile_no.length != 10)
      {
        error.mobile_no = "Please enter 10 digit Mobile number Required";
      }
      else if(mobile_no2 && mobile_no2.length != 10)
      {
        error.mobile_no2 = "Please enter 10 digit Mobile number Required";
      }
      if(!mobile_no2)
      {
        error.mobile_no2 = "Mobile number Required";
      }
     
    }
    // /*** Start Email Address Conditon ***/
    // Check Email Formate
    var check_email = document.getElementById("check_email").value;
    var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
    var isValid = pattern.test(check_email);
    if(email || !email)
    {
      if(!email)
      {
        error.email = "Email is Required"
      }
      else if(isValid == false)
      {
        alert("Please enter valid email-id");
      }
      else if(email==email2)
      {
        alert("Both email are same please enter differet email");   
      }
    }
    /*** End Email Address Conditon ***/
    if(!dob)
    {
      error.dob = "Date of birth Required"
    }
    if(!age)
    {
      error.age = "Age is Required"
    }
    if(!state)
    {
      error.state = "State is Required"
    }
    if(!city)
    {
      error.city = "City is Required"
    }
    if(!country)
    {
      error.country = "Country is Required"
    }
    if(!password)
    {
      error.password = "Password is Required"
    }
    if(password.length < 8 && password)
    {
      error.password = "Please enter minimum 8 character password"
    }
    if(!address)
    {
      error.address = "Address is Required"
    }
    if(!image1 && !LawyerId || LawyerId && !image1)
    {
      if(!image1 && !image2 && LawyerId)
      {
        error.image1 = "Image Required";
      }
      else if(!image1 && !image2 && !LawyerId)
      {
        error.image1 = "Image Required";
      }
      else
      {
        if(name && category_id && status && mobile_no && mobile_no2
          && email && email2 && dob && age && state && city && country && password && address && mobile_no.length == 10 && mobile_no2.length == 10 && email != email2 && mobile_no != mobile_no2 &&
          category_id > 0 && status > 0){
            upload();
          }
      }    
    }
    return error;
  }

   /* Add Lawyer */
  const handlesubmit = async(e) => {
    e.preventDefault();
    setFormerror(validation());
    
  
      
      // alert(mobile_no.length)
      // alert(mobile_no2.length)
      if(name && image1 && category_id && status && mobile_no && mobile_no2
        && email && email2 && dob && age && state && city && country && password && address && email != email2 && mobile_no != mobile_no2
        && category_id > 0 && status > 0){
          upload();
      
    }
  }

  /* Display in dropdown list of lawyer category */
  const selectCategory = async() => {
    try{
      const res = await axios.get("http://localhost:8866/backend/category")
      setCtype(res.data);
    }
    catch(err){
      alert(err);
    }
  }
 
  

  return (
    <div>
      <main id="main" class="main">
      <div class="col-lg-12" >
            <div class="card">
                <div class="card-body row">
                {!LawyerId? <h2 class="card-title col-6">Add Lawyer</h2> : <h2 class="card-title col-6">Edit Lawyer</h2>}
                <div class="col-6">
                  <button type="button" class="btn btn-danger float-end mt-3 rounded-pill" onClick={Display_lawyer}><b>Back</b></button>
                </div>
                    <form class="row g-3">
                      <div className="row">
                        <div className="col-md-12">
                          {LawyerId && !image1? <img src={`../upload/${image2}`}  width={100} height={100} class="float-md-end" style={{border: '2px solid black'}}></img> : ""}
                          {!LawyerId && image1? <img src={URL.createObjectURL(image1)}  width={100} height={100} class="float-md-end" style={{border: '2px solid black'}}></img> : ""}
                          {LawyerId && image1? <img src={URL.createObjectURL(image1)}  width={100} height={100} class="float-md-end" style={{border: '2px solid black'}}></img> : ""}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label class="form-label"><b>Lawyer Name <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="text" class="form-control" placeholder='Enter Your Lawyer Name' defaultValue={name} onChange={(e)=>setName(e.target.value)} />
                          <p style={{color: 'red'}} >{formerror.name}</p>
                        </div>
                        <div class="col-md-6">
                          <label class="form-label"><b>Add Lawyer Image <span style={{color: 'red'}}>*</span> </b></label><br></br>
                          <input type="file" class="form-control" accept="image/png, image/jpeg"  defaultValue={image1} onChange={(e)=>setImage(e.target.files[0])}/>
                          <p style={{color: 'red'}}>{formerror.image1}</p>
                        </div>
                      </div>

                      <div class="row">
                      <div class="col-md-6">
                          <div class="row">
                            <div class="col-sm-12">
                                <label class="form-label"><b>Lawyer Category <span style={{color: 'red'}}>*</span> </b></label>
                                <select class="form-select" id="example-select" name='category_id' value={category_id} select onChange={(e)=>setCategoryid(e.target.value)}>
                                    <option>-select-</option>
                                
                                {category_name.map((ctype) => ( 
                                  <> {ctype.status != 1 ? "" : <option value={ctype.category_id}>{ctype.category_name}</option>} </>
                                ))}

                                </select>
                                <p style={{color: 'red'}}>{formerror.category_id}</p>
                            </div>
                        </div>
                        </div>

                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-sm-12">
                                <label class="form-label"><b>Status <span style={{color: 'red'}}>*</span> </b></label>
                                <select name="state" id="state" class="form-select" value={status} select onChange={e=>setStatus(e.target.value)}>
                                    <option selected>-select-</option>
                                    <option value={1}>Active</option>
                                    <option value={2}>Inactive</option>
                                </select>
                                <p style={{color: 'red'}}>{formerror.status}</p>
                            </div>
                        </div>
                        </div>
                     
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <label class="form-label"><b>Mobile No <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="text" class="form-control" id="mno" placeholder='Enter Your Mobile No' defaultValue={mobile_no} onChange={(e)=>setMobile_no(e.target.value)}/>
                          <p style={{color: 'red'}}>{formerror.mobile_no}</p>
                        </div> 

                        <div class="quill-editor-default col-md-6">
                        <label class="form-label"><b>Mobile No  2 <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="text" class="form-control" id="mno" placeholder='Enter Your Mobile No' defaultValue={mobile_no2} onChange={(e)=>setMobile_no2(e.target.value)}/>                              
                          <p style={{color: 'red'}}>{formerror.mobile_no2}</p>
                        </div>
                      </div>

                      <div class='row'>
                        <div class="quill-editor-default col-md-6">
                          <label class="form-label"><b>Email-id <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="email" class="form-control" id="check_email" placeholder='Enter Your Email-id' defaultValue={email} onChange={(e)=>setEmail(e.target.value)}/>                              
                          <p style={{color:'red'}}>{formerror.email}</p>
                        </div>

                        <div class="quill-editor-default col-md-6">
                          <label class="form-label"><b>Email-id 2 <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="email" class="form-control" id="check_email" placeholder='Enter Your Email-id' defaultValue={email2} onChange={(e)=>setEmail2(e.target.value)}/>                              
                          <p style={{color:'red'}}>{formerror.email}</p>
                        </div>
    
                      </div>

                      <div class='row'>
                        <div class="col-md-6">
                          <label class="form-label"><b>Date of Birth <span style={{color: 'red'}}>*</span> </b></label>
                          
                          <input type="date" class="form-control" id="inputNanme4" value={dob} onChange={(e)=>setDob(e.target.value)}/>
                          <p style={{color:'red'}}>{formerror.dob}</p>
                        </div>

                        <div class="col-md-6">
                          <label class="form-label"><b>Age <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="text" class="form-control" id="inputNanme4"  placeholder='Enter Your Age' defaultValue={age} onChange={(e)=>setAge(e.target.value)}/>
                          <p style={{color: 'red'}}>{formerror.age}</p>
                        </div>
                      
                      </div>                     

                      <div class='row'>
                        <div class="col-md-6">
                          <label class="form-label"><b>City <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Your City' defaultValue={city} onChange={(e)=>setCity(e.target.value)}/>
                          <p style={{color: 'red'}}>{formerror.city}</p>
                        </div>

                        <div class="col-md-6">
                          <label class="form-label"><b>State <span style={{color: 'red'}}>*</span> </b></label>
                            <select name="state" id="state" class="form-select" value={state} select onChange={(e)=>setState(e.target.value)}>
                            <option>-select-</option>
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
                      
                      <div class="row">
                        <div class="col-md-6">
                          <label class="form-label"><b>Country <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Your Country' defaultValue={country} onChange={(e)=>setCountry(e.target.value)} disabled/>
                          <p style={{color: 'red'}}>{formerror.country}</p>
                        </div>

                        <div class="col-md-6">
                          <label class="form-label"><b>Password <span style={{color: 'red'}}>*</span> </b></label>
                          <input type="password" class="form-control" id="inputNanme4" placeholder='Enter Your Password' defaultValue={password} onChange={(e)=>setPassword(e.target.value)}/>
                          <p style={{color: 'red'}}>{formerror.password}</p>
                        </div>
                        
                      </div>

                      <div class="row">
                        <div class="col-md-12">
                          <label class="form-label"><b>Address <span style={{color: 'red'}}>*</span> </b></label>
                          <textarea type="text" class="form-control" id="inputNanme4" placeholder='Enter Your Address' defaultValue={address} onChange={(e)=>setAddress(e.target.value)}/>
                          <p style={{color: 'red'}}>{formerror.address}</p>

                        </div>
                      </div>

                        <div class="text-center">
                          <button type="submit" class="btn btn-primary rounded-pill" onClick={handlesubmit} style={{ marginRight: "10px" }}><b>Submit</b></button>
                          <button type="reset" class="btn btn-secondary rounded-pill"><b>Reset</b></button>
                        </div>
                    </form>
                </div>
            </div>
      </div>
      </main>
    </div>
  )
}
