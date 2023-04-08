import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import "./Dashboard.css";
import Table from "react-bootstrap/Table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from './../config';
const AgentCustomerPolicyHistory = () => {
  let location = useLocation()
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
  const [policies,setPolicies]=useState([])

  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }

  let agent = location.state.agent
  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(`${config.SpingUrl}/agent/getMyCustomorsPolicyHistory/${agent.id}`,{})
    .then(response=>setPolicies(response.data))
   
  },[])
  console.log("policies==>"+policies);
  return (
    <div className="dashboard d-flex">
      <div>
        <AgentSideBar agent={agent}/>
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
        <AgentNavBar agentName={agent.firstName} />
        <h1
          style={{
            marginBottom: "40px",
            marginLeft: "10px",
            textAlign: "center",
          }}
        >
          <b>My Customers History</b>
        </h1>
        <Table
          striped
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            borderColor: "#96D4D4",
          }}
        >
          <thead>
            <tr>
              <th>Policy Id</th>
              <th>Customer Name</th>
              <th>Policy Name</th>
              <th>Claim Amount</th>
              <th>Surrender Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              policies.map((policy)=>{
                return(
              <tr>
              <td>{policy.id}</td>
              <td>{policy.customer.firstName} {policy.customer.lastName}</td>
              <td>{policy.policy.policyName}</td>
              <td>{policy.claimAmount}</td>
              <td>{policy.surrenderAmount}</td>
              <td>{statusCreater(policy.claimStatus,policy.surrenderStatus)}</td>
              </tr>
                )
              })
            }
            
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default AgentCustomerPolicyHistory;
const styles = {
  button: {
    borderRadius: "15px",
  },
};
function statusCreater(claimStatus,surrenderStatus) {
  
  if(claimStatus==1)
  return "Pending For Claim"
  else  if(surrenderStatus==1)
  return "Pending For Surrender"
  else  if(claimStatus==2)
  return "Claimed Successfully"
  else  if(surrenderStatus==2)
  return "Surrendered Successfully"
  else  if(claimStatus==3)
  return "Claim Rejected"
  else
  return "Surrender Rejected"


}
