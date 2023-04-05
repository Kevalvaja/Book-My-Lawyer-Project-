import React,{useState} from 'react';
import './App.css';
import{
  createBrowserRouter,
  BrowserRouter,
  Route,
  Routes,
  Link,
  Outlet,
  useLocation
}from 'react-router-dom';
import Header from './views/Header.jsx';
import Side_bar from './views/Side_bar.jsx';
import Footer from './views/Footer.jsx';
import Dashborad from './views/Dashborad.jsx';
import Admin_profile from './views/Admin_profile.jsx';
import Display_lawyer_categories from './views/Display_lawyer_categories.jsx'
import Add_lawyer from './views/Add_lawyer.jsx';
import Replay_inquiry from './views/Replay_inquiry.jsx';
import Display_inquiry from './views/Display_inquiry.jsx';
import Display_lawyer from './views/Display_lawyer.jsx';
import Add_categories from './views/Add_categories.jsx';
import Login from './views/Login.jsx';

//Kishan
import About_form from './views/About_form.jsx';
import Contact_form from './views/Contact_form.jsx';
import Add_blog from './views/Add_blog.jsx';
import Add_client from './views/Add_client.jsx';
import Add_client_appointment from './views/Add_client_appointment.jsx';
import Display_client_appointment from './views/Display_client_appointment.jsx';
import Display_blog from './views/Display_blog.jsx';
import Display_client from './views/Display_client.jsx';
import Display_feedback from './views/DIsplay_feedback.jsx';
import Display_about_form from './views/Display_about_form.jsx';
import Display_contact from './views/Display_contact.jsx';
import Approve_appointment from './views/Approve_appointment.jsx';
import Disapprove_appointment from './views/Disapprove_appointment.jsx';
import Forget_password from './views/Forget_password.jsx';
import Change_password from './views/Change_password.jsx';
import Add_inquiry_lawyer from './views/Add_inquiry_lawyer.jsx';
import Display_inquiry_lawyer from './views/Display_inquiry_lawyer.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout></Layout>,
//     children:[
//       {
//         path: "/",
//         element:<Dashborad></Dashborad>
//       },
//       {
//         path: "/Admin_profile",
//         element: <Admin_profile></Admin_profile>
//       },
//       {
//         path: "/Display_lawyer_categories",
//         element: <Display_lawyer_categories></Display_lawyer_categories>
//       },
//       {
//         path: "/Add_lawyer_categories",
//         element: <Add_categories></Add_categories>
//       },
//       {
//         path: "/Add_lawyer_categories/:id",
//         element: <Add_categories></Add_categories>
//       },
//       {
//         path: "/Add_lawyer",
//         element: <Add_lawyer></Add_lawyer>
//       },
//       {
//         path: "/Add_lawyer/:id",
//         element: <Add_lawyer></Add_lawyer>
//       },
//       {
//         path: "/Display_lawyer",
//         element: <Display_lawyer></Display_lawyer>
//       },
//       {
//         path: "/Display_inquiry",
//         element: <Display_inquiry></Display_inquiry>
//       },
//       {
//         path: "/Replay_inquiry/:id",
//         element: <Replay_inquiry></Replay_inquiry>
//       },
//       {
//         path: "/Login",
//         element: <Login></Login>
//       },


//       //Kishan

//       {
//         path: "/About_form",
//         element: <About_form></About_form>
//       },
//       {
//         path: "/About_form/:id",
//         element: <About_form></About_form>
//       },

//       {
//         path: "/Add_client",
//         element: <Add_client></Add_client>
//       },
//       {
//         path: "/Add_client/:id",
//         element: <Add_client></Add_client>
//       },
//       {
//         path: "/blog",
//         element: <Add_blog></Add_blog>
//       },
//       {
//         path: "/blog/:id",
//         element: <Add_blog></Add_blog>
//       },

//       {
//         path: "/Client_appointment",
//         element: <Add_client_appointment></Add_client_appointment>
//       },
//       {
//         path: "/Client_appointment/:id",
//         element: <Add_client_appointment></Add_client_appointment>
//       },
      
//       {
//         path: "/Contact_form",
//         element: <Contact_form></Contact_form>
//       },
      
      
//       {
//         path: "/Contact",
//         element: <Contact_form></Contact_form>
//       }, 
//       {
//         path: "/Contact/:id",
//         element: <Contact_form></Contact_form>
//       }, 
      
      

//       {
//         path:"/Display_client_appointment",
//         element:<Display_client_appointment></Display_client_appointment>
//       },
//       {
//         path:"/Display_blog",
//         element:<Display_blog></Display_blog>
//       },
//       {
//         path:"/Display_client",
//         element:<Display_client></Display_client>
//       },
//       {
//         path:"/Displayfeedback",
//         element:<Display_feedback></Display_feedback>
//       },
//       {
//         path:"/Display_about_us",
//         element:<Display_about_form></Display_about_form>
//       },
//       {
//         path:"/Display_contact",
//         element:<Display_contact></Display_contact>
//       }
//     ]
//   }
// ])
const Layout = () =>{
  return(
    <div>
      <Header></Header>
      <Side_bar></Side_bar>
      <Outlet></Outlet>
    </div>
  );
};

function App() {
  const [auth,setAuth]=useState(sessionStorage.getItem("user"));
  const [role,setRole]=useState(sessionStorage.getItem("role"));
  const [forget_role,setForget_role] = useState(sessionStorage.getItem("Forget_role"));
  const [user,setUser] = useState(sessionStorage.getItem("change_pass"));
  console.log(forget_role);
  return (
   <div>
      <BrowserRouter>
        {role>0 && role<2 ? (<>
          <Layout></Layout>
          <Routes>
            <Route path='/' element={<Dashborad/>}/>
            <Route path='/Display_lawyer' element={<Display_lawyer/>}/>
            <Route path='/Display_lawyer_categories' element={<Display_lawyer_categories/>}/>
            <Route path='/Display_client' element={<Display_client/>}/>
            <Route path='/Display_client_appointment' element={<Display_client_appointment/>}/>
            <Route path='/Display_inquiry' element={<Display_inquiry/>}/>
            <Route path='/Display_blog' element={<Display_blog/>}/>
            <Route path='/Displayfeedback' element={<Display_feedback/>}/>
            <Route path='/Admin_profile' element={<Admin_profile/>}/>
            <Route path='/Admin_profile/:id' element={<Admin_profile/>}/>
            <Route path='/Display_about_us' element={<Display_about_form/>}/>
            <Route path='/Display_contact' element={<Display_contact/>}/>

            {/* Add And Edit Router are call here */}

            {/* Add Lawyer And Edit Lawyer */}
            <Route path='/Add_lawyer' element={<Add_lawyer/>}/>
            <Route path='/Add_lawyer/:id' element={<Add_lawyer/>}/>

            {/* Add Lawyer category And Edit Lawyer category */}
            <Route path='/Add_lawyer_categories' element={<Add_categories/>}/>
            <Route path='/Add_lawyer_categories/:id' element={<Add_categories/>}/>
            
            {/* Add Client And Edit Client */}
            <Route path='/Add_client' element={<Add_client/>}/>
            <Route path='/Add_client/:id' element={<Add_client/>}/>

            {/* Add Client Appointment And Edit Client Appointment */}
            <Route path='/Client_appointment' element={<Add_client_appointment/>}/>
            <Route path='/Client_appointment/:id' element={<Add_client_appointment/>}/>

            {/* Reply Inquiry */}
            <Route path='/Replay_inquiry/:id' element={<Replay_inquiry/>}/>

            {/* Add Blog And Edit Blog */}
            <Route path='/blog' element={<Add_blog/>}/>
            <Route path='/blog/:id' element={<Add_blog/>}/>

            {/* Add About Us And Edit About Us */}
            <Route path='/About_form' element={<About_form/>}/>
            <Route path='/About_form/:id' element={<About_form/>}/>

            {/* Add Contact Us And Edit Contact Us */}
            <Route path='/Contact' element={<Contact_form/>}/>
            <Route path='/Contact/:id' element={<Contact_form/>}/>

          </Routes>
          <Footer></Footer>
        </>):
        role>0 && role<3 ? 
        (
        <>
         <Layout></Layout>
          <Routes>
            <Route path='/' element={<Dashborad/>}/>
            <Route path='/Admin_profile' element={<Admin_profile/>}/>
            <Route path='/Admin_profile/:id' element={<Admin_profile/>}/>
            <Route path='/Display_client_appointment' element={<Display_client_appointment/>}/>
            <Route path='/Display_inquiry' element={<Display_inquiry/>}/>
            <Route path='/Display_blog' element={<Display_blog/>}/>
            <Route path='/Approve_appointment' element={<Approve_appointment/>}/>
            <Route path='/Disapprove_appoinment' element={<Disapprove_appointment/>}/>

            {/* Add Client Appointment And Edit Client Appointment */}
            <Route path='/Client_appointment' element={<Add_client_appointment/>}/>
            <Route path='/Display_client_appointment/:id' element={<Display_client_appointment/>}/>
            <Route path='/Approve_appointment/:id' element={<Approve_appointment/>}/>
            <Route path='/Disapprove_appoinment/:id' element={<Disapprove_appointment/>}/>

            {/* Reply Inquiry */}
            <Route path='/Replay_inquiry/:id' element={<Replay_inquiry/>}/>
                    
            {/* Add Blog And Edit Blog */}
            <Route path='/blog' element={<Add_blog/>}/>
            <Route path='/blog/:id' element={<Add_blog/>}/>

            {/* Add Inquiery */}    
            <Route path='/inquiry' element={<Add_inquiry_lawyer/>}/>
            <Route path='/Display_inquiry_lawyer' element={<Display_inquiry_lawyer/>}/>
            <Route path='/inquiry/:id' element={<Add_inquiry_lawyer/>}/>
          </Routes>
        </>
        ):(
        <>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/forget_password' element={<Forget_password/>}/>
          <Route path='/change_password' element={<Change_password/>}/>
        </Routes>
        </>
        )}
      </BrowserRouter>
   </div>
  );
}

export default App;
