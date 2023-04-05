import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Forget_password() {

  const [email,setEmail] = useState("");
  const [role,setRole] = useState(1);
  const navigate = useNavigate();
  
  const btnheadle = async() => {
    if(role == 2)
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/forget_password_lawyer",{
          params:{
            email:email
          }
        })
        if(res.data>0)
        {
          sessionStorage.setItem("change_pass",res.data);
          // sessionStorage.setItem("Forget_role",role);
          navigate("/change_password");
        }
        else
        {
          alert("This Email-Id is not exist");
        }
      }
      catch(err) {
        alert(err);
      }
    }
    else
    {
      try{
        const res = await axios.get("http://localhost:8866/backend/forget_password_admin",{
          params:{
            email:email
          }
        })
        if(res.data>0)
        {
          sessionStorage.setItem("change_pass",res.data);
          sessionStorage.setItem("Forget_role",role);
          navigate("/change_password");
        }
        else
        {
          alert("This Email-Id is not exist");
        }
      }
      catch(err){
        alert(err);
      }
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
                  <a href="index.html" class="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt=""/>
                  </a>
                </div>

                <div class="card mb-3">

                  <div class="card-body">

                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Forget Your Password</h5>
                      {/* <p class="text-center small" style={{color:'red'}}>{loginerror.mobileno}</p>
                      <p class="text-center small" style={{color:'red'}}>{loginerror.password}</p> */}
                    </div>

                    <form class="row g-3 needs-validation" novalidate>

                      <div class="col-12">
                        <label for="yourUsername" class="form-label"><b>Email-Id</b></label>
                        <div class="input-group has-validation">
                        </div>                          
                          <input type="text" name="username" class="form-control" id="yourUsername" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                      <div class="col-12">
                          <label class="form-label"><b>Select User</b></label>
                                <select name="state" id="state" class="form-select" onChange={(e)=>setRole(e.target.value)}>
                                    <option value="1">Admin</option>
                                    <option value="2">Lawyer</option>
                                </select>
                      </div>

                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit" onClick={btnheadle}>Submit</button>
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
