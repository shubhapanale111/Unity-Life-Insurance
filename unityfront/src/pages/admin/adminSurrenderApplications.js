import AdminSideBar from "./adminsidebar";
import AdminNavBar from "./adminnavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";
import config from './../config';
const AdminSurrenderApplications=()=>{
  let location=useLocation();
  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  let [customerPolicies,setCustomerPolicies]=useState([]);
  let admin=location.state.admin
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  useEffect(()=>{
   
  if(!token)
  {
    toast.error("Unauthorized access please login first")
    Navigate("/signin")
  }
  else{
    axios.get(`${config.SpingUrl}/admin/getNewSurrenders`).then((response)=>{
      setCustomerPolicies(response.data)
      console.log("customer Policies==>"+customerPolicies)
    }

    ).catch((error)=>{
      toast.error("Date Fetchhing Failed.."+error)
    })
  }
},[])

    return(
        <div className="dashboard d-flex">
    	<div>
      	<AdminSideBar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AdminNavBar adminName={admin.firstName}/>
        <h1 style={{marginBottom:'40px',marginLeft:'10px',textAlign:'center'}}><b>Applications For Surrender</b></h1>
        <Table striped style={{border: '1px solid black',
  borderRadius:'10px',
borderColor: '#96D4D4',}}>
     <thead >
        <tr>
              <th>Customer Id</th>
                <th>Customer Name</th>
                <th>Policy ID</th>
                <th>Policy Name</th>
                <th>Email</th>
        </tr>
      </thead>
      <tbody>
             {customerPolicies.map((customerpolicy)=>{
              return(
                <tr>
                <td>{customerpolicy.customer.id}</td>
              <td>{customerpolicy.customer.firstName} {customerpolicy.customer.lastName}</td>
                      <td>{customerpolicy.id}</td>
                <td>{customerpolicy.policy.policyName}</td>
                <td>{customerpolicy.customer.email}</td>
                <td><Link to='/adminSurrenderApplicationDetails' className='btn btn-primary' state={{admin:admin,customerPolicy:customerpolicy}} style={styles.button}>View Details</Link></td>
              </tr>
              )
             })

             }
        
      </tbody>
    </Table>
        </div>
        </div>

    )
}
export default AdminSurrenderApplications
const styles={
  button:  {
      borderRadius:'15px',
    }
}