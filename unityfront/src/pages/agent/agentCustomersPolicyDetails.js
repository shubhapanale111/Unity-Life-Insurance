import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import "./Dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from './../config';
const AgentCustomersPolicyDetails = () => {
  let location = useLocation()

  let agent = location.state.agent
  let customer = location.state.customer
  let customerPolicy=location.state.customerPolicy
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))


  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  const claim=()=>{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    let policyEndDate=new Date(customerPolicy.policyEndDate);
    if(policyEndDate>new Date())
    {
      toast.error("Policy Can be Claimed After "+policyEndDate)
    }
    else{
      axios.put(`${config.SpingUrl}/agent/applyForClaim/${customerPolicy.id}`,{})
      .then(response=>{toast.success("Requested For Claim Succesfully!!! ")
        Navigate("/agentCustomerPolicies",{state:{agent:agent,customer:customer}})
    })
      .catch(error=>toast.error("Claim Request Failed"));
    }
   
}
  
  const surrender=()=>{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    let policyStartDate=customerPolicy.policyStartDate;
let MonthsUpToDate=getMonthDifference(new Date(policyStartDate),new Date());
    if(MonthsUpToDate<6){
    console.log(MonthsUpToDate);
    toast.error("Miniumum 6 Months Tenure Should be Completed")
    }
    else{
      axios.put(`${config.SpingUrl}/agent/applyForSurrender/${customerPolicy.id}`,{})
      .then(response=>{toast.success("Requested For Surrender Succesfully!!! ")
        Navigate("/agentCustomerPolicies",{state:{agent:agent,customer:customer}})
    })
      .catch(error=>toast.error("Surrender Request Failed"));
 }
}
  return (
    <div className="dashboard d-flex">
      <div>
        <AgentSideBar agent={agent} />
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
        <AgentNavBar agentName={agent.firstName}/>
        <h1>Details:</h1>

        <center>
          <h1>PolicyDetails</h1>
          <br />

          <table
            className="table"
            style={{ width: "60%", border: "2px", borderBlockStyle: "solid" }}
          >
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
              <tr>
                <td>Agent</td>
                <td>{agent.firstName} {agent.lastName}</td>
              </tr>
            </tbody>
          </table>
        </center>
        <center>
          <table className="table" style={{ width: "60%" }}>
            <tr>
              <td>
                <button
                  className="btn btn-success mt-4"
                  style={{
                    width: "350px",
                    borderRadius: "15px",
                    backgroundColor: "green",
                   
                  }}
                  onClick={claim}
                >
                  Claim
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger mt-4"
                  style={{
                    width: "350px",
                    borderRadius: "15px",
                    backgroundColor: "red",
                   
                  }}
                  onClick={surrender}
                >
                  Surrender
                </button>
              </td>
            </tr>
          </table>
        </center>
      </div>
    </div>
  );
};
export default AgentCustomersPolicyDetails;
const styles = {
  myfont: {
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "left",
  },
};
function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}
