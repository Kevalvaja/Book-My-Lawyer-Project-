import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Change_password() {

    const Id = sessionStorage.getItem("change_pass");
    const role = sessionStorage.getItem("Forget_role");
    const entry_by = Id;
    const [password,setPassword] = useState("");
    const [password1,setPassword1] = useState("");
    const navigate = useNavigate();
    const [formerror,setFormerror] = useState({});

    const validation = () => {
      const error = {};
      if(!password && !password1)
      { 
        error.password = "Please enter password and confirm password";
      }
      else if(!password)
      {
        error.password = "Please enter password";
      }
      if(!password1)
      {
        error.password1 = "Please enter confirm password";
      }
      else if(password == password1)
      {
        error.password1 = "Password and confirm password are same";
      }
      return error;
    }
    const btnchange_pass = async(e) =>{
      e.preventDefault();
      setFormerror(validation());
      if(role == 1)
      {
        if(password && password1 && password != password1)
        {
            try{
                const res = await axios.put("http://localhost:8866/backend/changepass_admin/" + Id ,{
                    password,
                    entry_by
                });
                alert(res.data);
                sessionStorage.clear();
                window.location.reload();
                navigate("/");
                
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
        if(password && password1 && password != password1)
        {
            try{
                const res = await axios.put("http://localhost:8866/backend/changepass_lawyer/" + Id ,{
                    password,
                    entry_by
                });
                alert(res.data);
                sessionStorage.clear();
                window.location.reload();
                navigate("/");
                
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
          
    }
  return (
    <div>
    {Id?
        <main>
        <div class="container">

        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div class="d-flex justify-content-center py-4">
                  <a href="index.html" class="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt=""/>
                  </a>
                </div>

                <div class="card mb-3">

                  <div class="card-body">

                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Change Your Password</h5>
                      {/* <p class="text-center small" style={{color:'red'}}>{loginerror.mobileno}</p>
                      <p class="text-center small" style={{color:'red'}}>{loginerror.password}</p> */}
                    </div>

                    <form class="row g-3 needs-validation" novalidate>

                      <div class="col-12">
                        <label for="yourUsername" class="form-label"><b>New Password</b></label>
                        <div class="input-group has-validation">
                          <input type="password" name="username" class="form-control" id="yourUsername" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label"><b>Confirm Password</b></label>
                        <input type="password" name="password" class="form-control" id="yourPassword"  onChange={(e)=>setPassword1(e.target.value)}/>
                      </div>
                      <p style={{color:'red'}}>{formerror.password}</p>
                      <p style={{color:'red'}}>{formerror.password1}</p>
                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit" onClick={btnchange_pass}>Save Changes</button>
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
    : <center><h1>404 Page Not Found</h1></center>}
      
    </div>
  )
}
