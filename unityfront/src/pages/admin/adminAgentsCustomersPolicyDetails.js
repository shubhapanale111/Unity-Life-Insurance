import AdminSideBar from "./adminsidebar";
import AdminNavBar from "./adminnavbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";
const AdminAgentsCustomersPolicyDetails =()=>{
  let location = useLocation()
  let admin = location.state.admin
  let customer=location.state.customer
  let agent=location.state.agent
  let customerPolicy=location.state.customerPolicy
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_ADMIN'))

  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  useEffect(()=>{
    if (token == null) {
        toast.error('Unauthorized access please login first')
        Navigate('/signin')
      }
   
  },[])
    return(
        <div className="dashboard d-flex">
    	<div>
      <AdminSideBar admin={admin} />
    </div>
    <div
      style={{
        flex: "1 1 auto",
        display: "flex",
        flexFlow: "column",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <AdminNavBar adminName={admin.firstName}/>
        <h1 >Policy Details:</h1>
       
        <center>
             <h1>{customerPolicy.policy.policyName}</h1>
             <br />

        <table className='table'  style={{width:'60%',border:'2px',borderBlockStyle:'solid'}}>
  <tbody style={styles.myfont}>
  <tr>
                <td>
                  <h4>Policy Name</h4>
                </td>
                <td>
                  <h4>{customerPolicy.policy.policyName}</h4>
                </td>
              </tr>
              <tr>
                <td>Policy Holder Name</td>
                <td>{customer.firstName} {customer.lastName}</td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td>{customerPolicy.policyStartDate}</td>
              </tr>
              <tr>
                <td>End Date</td>
                <td>{customerPolicy.policyEndDate}</td>
              </tr>
              <tr>
                <td>Premium</td>
                <td>{customerPolicy.premium}</td>
              </tr>
              <tr>
                <td>Claim Ammount</td>
                <td>{customerPolicy.claimAmount}</td>
              </tr>
    </tbody>
                    </table>
                </center>
                <center>
                <Link
                to="/adminAgentCustomerPolicies"
                className="btn btn-warning"
                style={styles.button}
                state={{customer:customer,admin:admin,agent:agent,customerPolicy:customerPolicy}}
              > 
              Back to {customer.firstName}s Policies
              </Link>
                </center>
        </div>
        </div>
    )
}
export default AdminAgentsCustomersPolicyDetails
const styles={
    myfont: {
        textDecoration: "none",
        fontWeight: "bold",
        textAlign:"left",
      },
      button:{
        borderRadius:'15px'
      }
}