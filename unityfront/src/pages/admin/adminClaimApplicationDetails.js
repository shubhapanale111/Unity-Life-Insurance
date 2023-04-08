import AdminSideBar from "./adminsidebar";
import AdminNavBar from "./adminnavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Dashboard.css";
import config from './../config';
import { Button } from "react-bootstrap";
const AdminClaimApplicationDetails =()=>{
  let location=useLocation();
  const Navigate=useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  let customerPolicy=location.state.customerPolicy
  let admin=location.state.admin
  let customer=customerPolicy.customer;
  let panViewUrl=`${config.SpingUrl}/customer/getPanDoc/${customer.id}`
  let aadharViewUrl=`${config.SpingUrl}/customer/getAadharDoc/${customer.id}`
let profileImageGet=`${config.SpingUrl}/customer/getProfileImage/${customer.id}`
  console.log(customerPolicy);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const accept=(customerPolicyId)=>{
    axios.put(`${config.SpingUrl}/admin/acceptClaim/${customerPolicyId}`).then(
     (response)=>{
       toast.success("Policy Claim Granted Successfully")
       Navigate("/adminClaimApplications", {state:{admin:admin}})
     }
    ).catch((error)=>{
      toast.error("Policy Acception Failed"+error)
    })
   }
   const reject=(customerPolicyId)=>{
    axios.put(`${config.SpingUrl}/admin/rejectClaim/${customerPolicyId}`).then(
     (response)=>{
       toast.success("Policy Claim Rejected SuccessFully")
       Navigate("/adminClaimApplications", {state:{admin:admin}})
     }
    ).catch((error)=>{
      toast.error("Policy Rejection Failed"+error)
    })
   }
  useEffect(()=>{
   
  if(!token)
  {
    toast.error("Unauthorized access please login first")
    Navigate("/signin")
  }
});
    return(
        <div className="dashboard d-flex">
    	<div>
      	<AdminSideBar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AdminNavBar adminName={admin.firstName}/>
        <h1 >Details:</h1>
       
        <center>
             <h1>{customerPolicy.policy.policyName}</h1>
             <br />

        <table className='table'  style={{width:'60%',border:'2px',borderBlockStyle:'solid'}}>
  <tbody style={styles.myfont}>
    <tr>
      <td><h4>Policy ID</h4></td>
      <td><h4>{customerPolicy.id}</h4></td>
    </tr>
    <tr>
      <td>Customer Name</td>
      <td>{customerPolicy.customer.firstName} {customerPolicy.customer.lastName}</td>
    </tr>
    <tr>
    <td>Mobile Number</td>
      <td>{customerPolicy.customer.phoneNumber}</td>
    </tr>
    <tr>
    <td>Email ID</td>
      <td>{customerPolicy.customer.email}</td>
    </tr>
    <tr>
    <td>Date of Birth</td>
      <td>{customerPolicy.customer.dateOfBirth}</td>
    </tr>
    <tr>
    <td>AddressLine1</td>
      <td>{customerPolicy.customer.address.addressLine1}</td>
    </tr>
    <tr>
    <td>AddressLine2</td>
      <td>{customerPolicy.customer.address.addressLine2}</td>
    </tr>
    <tr>
    <td>Village</td>
      <td>{customerPolicy.customer.address.village}</td>
    </tr>
    <tr>
    <td>City</td>
      <td>{customerPolicy.customer.address.city}</td>
    </tr>
    <tr>
    <td>State</td>
      <td>{customerPolicy.customer.address.state}</td>
    </tr>
    <tr>
    <td>Aadhar</td>
      <td>{customerPolicy.customer.aadhar}</td>
    </tr>
    <tr>
    <td>Pan</td>
      <td>{customerPolicy.customer.pan}</td>
    </tr>
    <tr>
    <td>Premium</td>
      <td>{customerPolicy.premium} INR</td>
    </tr>
    <tr>
                <td><Button onClick={()=>{window.open(aadharViewUrl,"_blank")}} className='btn btn-success'>View Aadhar</Button> </td>
                <td><Button onClick={()=>{window.open(panViewUrl,"_blank")}} className='btn btn-success' style={{marginRight:'20px'}}>View Pan</Button>
                <Button onClick={()=>{window.open(profileImageGet,"_blank")}} className='btn btn-success'> View Profile Image</Button></td>
              </tr>
    </tbody>
                    </table>
                </center>
                <center>
                <table className='table' style={{ width: '60%' }}>
                    <tr>
                        <td>
                            <button className='btn btn-success mt-4' type="submit" onClick={()=>{accept(customerPolicy.id)}} style={{ width: '350px', borderRadius: '15px',backgroundColor:'green' }}>Accept Claim</button>
                        </td>
                        <td>
                            <button className='btn btn-danger mt-4' type="submit"onClick={()=>{reject(customerPolicy.id)}} style={{ width: '350px', borderRadius: '15px',backgroundColor:'red' }}>Reject Claim</button>
                            </td>
                        </tr>
                </table>
                </center>
        </div>
        </div>
    )
}
export default AdminClaimApplicationDetails
const styles={
    myfont: {
        textDecoration: "none",
        fontWeight: "bold",
        textAlign:"left",
      },
}
