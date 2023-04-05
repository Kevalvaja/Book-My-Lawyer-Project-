import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { format } from 'date-fns';
export default function Display_feedback() {

  const[Feedback,setfeedback]=useState([]);
  let i=1;

  useEffect (()=>{
    fatchfeedback();
  },[]);

 const fatchfeedback = async() => {
  try{
    const res = await axios.get("http://localhost:8866/backend/join_feedback");
    setfeedback(res.data);
  }
  catch(err){
    alert(err);
  }
 }
  const handledelete=async(e)=>{
    if(window.confirm("Are You Sure ??")==true)
    try
    {
            const res=await axios.delete("http://localhost:8866/backend/feedback/"+e);
            window.location.reload();
    }
    catch(err)
    {
            alert(err);
    }
  }

  return (
    <div>
      <main id="main" class="main">
        <div class="col-12" style={{width:"100%"}}>
        <div class="card">
        <div class="card-body">
        <h5 class="card-title">Feedback</h5>
        <table class="table table-striped" style={{marginTop:"20px",textAlign:"center"}}>
        <thead>
                  <tr>                      
                      <th>#</th>
                      <th>client name</th>
                      <th>Feedback Title</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Entry_date</th>
                      <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                {Feedback.map((feedback)=>
                    <tr>
                      <th>{i++}</th>
                                <td>{feedback.client_name}</td>
                                <td>{feedback.feedback_title}</td>
                                <td>{feedback.message}</td>                             
                                <td>{feedback.status == 1? "Active" : "Inactive" }</td>
                                <td>{format(new Date(feedback.entry_date), 'dd-MM-yyyy')}</td>
                                <td>
                                    <button type="submit" class="btn btn-danger rounded-pill" onClick={(e)=>handledelete(feedback.feedback_id)}>Delete</button>
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
