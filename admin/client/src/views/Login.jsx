import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {

  const [mobile_no,setMobileno]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole] = useState(1);

  const [loginerror,setLoginerror] = useState({});
 
  const validation = () => {
    const error = {};
    if(!mobile_no && !password)
    {
      error.mobile_no = "Please enter Mobile no And Password"
    }
    else if(!mobile_no)
    {
      error.mobile_no = "Please enter mobile no";
    }
    else if(!password)
    {
      error.password = "Please enter password";
    }
    else if(mobile_no.length < 10)
    {
      error.mobile_no = "Please enter 10 digit number";
    }
    else if(password.length != 8)
    {
      if(password.length < 8)
      {
        error.password = "Please enter atleast 8 Character";
      }
      else
      {
        Loginhendle();
      }
    }
    return error;
  }
  
  const Loginhendle = async(e) => {
    e.preventDefault();
    setLoginerror(validation());
    if(mobile_no.length == 10 && password.length >= 8 && mobile_no && password)
    {
      sessionStorage.setItem("role",role);
    if(role == 2)
    {
      try{
          const res = await axios.get("http://localhost:8866/backend/lawyer_login",{
          params:{
            mobile_no: mobile_no,
            password : password
          }
        })
        if(res.data>0)
        {
          sessionStorage.setItem("user",res.data);
          window.location.reload();
        }
        else{
          alert("Mobile no and Password are not exist.");
        }
      }
      catch(err){
        alert(err);
      }
    }
    else
    {
      if(mobile_no && password || !loginerror)
      {
        try{
            const res = await axios.get("http://localhost:8866/backend/login",{
            params:{
              mobile_no: mobile_no,
              password : password
            }
          })
          if(res.data>0)
          {
            sessionStorage.setItem("user",res.data);
            window.location.reload();
          }
          else{
            alert("Mobile no and Password are not exist.");
          }
        }
        catch(err){
          alert(err);
        }  
      }
      }
    }
    else
    {
      setLoginerror(validation());
    }
    
  }

  return (
    <div>
      <main>
        <div class="container">

        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div class="d-flex justify-content-center py-4">
                  <Link to="/" class="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt=""/>
                  </Link>
                </div>

                <div class="card mb-3">

                  <div class="card-body">

                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p class="text-center small" style={{color:'red'}}>{loginerror.mobile_no}</p>
                      <p class="text-center small" style={{color:'red'}}>{loginerror.password}</p>
                    </div>

                    <form class="row g-3 needs-validation" novalidate>

                      <div class="col-12">
                        <label for="yourUsername" class="form-label"><b>Mobile No</b></label>
                        <div class="input-group has-validation">
                          <input type="text" name="username" class="form-control" id="yourUsername" onChange={(e)=>setMobileno(e.target.value)}/>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label"><b>Password</b></label>
                        <input type="password" name="password" class="form-control" id="yourPassword" onChange={(e)=>setPassword(e.target.value)} />
                      </div>

                      <div class="col-12">
                          <label class="form-label"><b>Select User</b></label>
                                <select name="state" id="state" class="form-select" onChange={e=>setRole(e.target.value)}>
                                    <option value={1}>Admin</option>
                                    <option value={2}>Lawyer</option>
                                </select>
                      </div>

                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit" onClick={Loginhendle}>Login</button>
                      </div>
                      <div class="col-12">
                        <Link to="/forget_password" class="small mb-0 float-end">Forget Password</Link>
                      </div>
                    </form>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </section>

        </div>
      </main>
    </div>
  )
}
