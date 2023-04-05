import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate,Link,useLocation } from 'react-router-dom';


export default function Add_inquiry_lawyer() {

    const [inquiry_title,setInquiry_title] = useState();
    const [message,setMessage] = useState('');
    const lawyer_id = sessionStorage.getItem("user");
    const entry_by = lawyer_id;
    const role = sessionStorage.getItem("role");
    const [formerror,setFormerror] =useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const inquiry_id = location.pathname.split("/")[2];

    useEffect(()=>{
        if(role == 2 && inquiry_id)
        {
            put_inquiry();
        }
    })

    const validation = () => {
        const error = {};
        if(!inquiry_title)
        {
            error.inquiry_title = "Required Inquiry Title";
        }
        if(!message)
        {
            error.message = "Required Inquiry Message";
        }
        return error;
    }

    const send_inquiry = async(e) => {
        e.preventDefault();
        setFormerror(validation());
        if(inquiry_title && message)
        {
            if(!inquiry_id)
            {

                try{
                    const res = await axios.post("http://localhost:8866/backend/add_inquiry_lawyer",{
                        lawyer_id,
                        inquiry_title,
                        message,
                        entry_by
                    });
                    alert(res.data);
                    navigate("/Display_inquiry_lawyer");
                    window.location.reload();
                }
                catch(err){
                    alert(err);
                }
            }  
            else
            {
                alert(message);
                try{
                    const res = await axios.put("http://localhost:8866/backend/add_inquiry_lawyer/" + inquiry_id,{
                        inquiry_title,
                        message,
                        entry_by
                    });
                    alert(res.data);
                    navigate("/Display_inquiry_lawyer");
                    window.location.reload();
                }
                catch(err){
                    alert(err);
                }
            }

        }
    }

    const put_inquiry = async() => {
        try{
            const res = await axios.get("http://localhost:8866/backend/replay_inquiry/" + inquiry_id);
            setInquiry_title(res.data.inquiry_title);
            setMessage(res.data.message);

        }
        catch(err){
            alert(err);
        }
    }
  return (
    <div>
      
            <main id="main" class="main">
                <section class="section">
                <div class="row">
                    <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <div className='row'>
                            <h5 class="card-title col-6">Add Inquiry</h5>
                                <div className='col-6'>
                                    <button type="submit" className='mt-3 btn btn-danger rounded-pill float-end'><Link to="/Display_inquiry_lawyer" style={{color:'white'}}>Back</Link></button>
                                </div>
                            </div>
                        <form class="row g-3">
                            <div class="col-md-12">
                            <label for="inputNanme4" class="form-label"><b>Inquiry Title</b></label>
                            <input type="text" class="form-control" id="inputNanme4" placeholder='Enter Inquiry Title' defaultValue={inquiry_title} onChange={(e)=>setInquiry_title(e.target.value)}/>
                            <p style={{color: 'red'}}>{formerror.inquiry_title}</p>
                            </div>
                            <div class="col-12">
                            <label for="inputAddress" class="form-label"><b>Message</b></label>
                            <textarea type="text" class="form-control" id="inputAddress" placeholder="Enter Inquiry Message" defaultValue={message} onChange={(e)=>setMessage(e.target.value)}/>
                            <p style={{color: 'red'}}>{formerror.message}</p>
                            </div>
                            <div class="text-center">
                            <button type="submit" class="btn btn-primary rounded-pill" style={{marginRight: "10px"}} onClick={send_inquiry}>Submit</button>
                            <button type="reset" class="btn btn-secondary rounded-pill">Reset</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </main>

    </div>
  )
}
