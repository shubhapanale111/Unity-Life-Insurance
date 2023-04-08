import CustomerSideBar from "./customersidebar";
import CustomerNavBar from "./customernavbar";
import "./Dashboard.css";
import Table from "react-bootstrap/Table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from './../config';
const CustomerPolicyHistory = () => {
    let location = useLocation()
    const customer = location.state.customer
  const Navigate = useNavigate()
  const [policies,setPolicies]=useState([])
  if (sessionStorage['token_CUSTOMER'] == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  useEffect(()=>{
      axios.get(`${config.ExpressUrl}/customer/${customer.user.id}/getCustomorsPolicyHistory`, { headers: { token: sessionStorage['token_CUSTOMER'] } })
    .then(response=>setPolicies(response.data.data))
   //console.log(policies)
  },[])
  console.log("policies==>"+policies);
  return (
    <div className="dashboard d-flex">
      <div>
        <CustomerSideBar customer={customer}/>
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
        <CustomerNavBar customerName={customer.user.first_name} />
        <h1
          style={{
            marginBottom: "40px",
            marginLeft: "10px",
            textAlign: "center",
          }}
        >
          <b>Customers History</b>
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
              <td>{policy.claim_amount}</td>
              <td>{policy.surrender_amount}</td>
              <td>{statusCreater(policy.claim_status,policy.surrender_status)}</td>
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
export default CustomerPolicyHistory;
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
