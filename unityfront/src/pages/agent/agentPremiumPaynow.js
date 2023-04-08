import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import "./Dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";

const AgentPaynow=()=>{
    let location = useLocation()
  
  let agent = location.state.agent
  let customer=location.state.customer
  let premium=location.state.premium
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
 

  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  const payNow=()=>{
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  
    let agentId=agent.id;
    let customerId=customer.id;
    let policyId=premium.policy.id;
    let customerPolicyId=premium.id
    let amount=premium.premium
    axios.post(`${config.SpingUrl}/agent/payMyCustomersPremium`,{},{
        params:{
            agentId,
            customerId,
            policyId,
            customerPolicyId,
            amount,
        }
    }).then((response)=>{
        console.log(response.data);
        if(response.status==200)
        toast.success("Premium Paid SuccessFully")
        Navigate("/agentPremiumPayment",{state:{agent:agent}})
    }
    ).catch(error=>toast.error("Premium Paid Failed "+error))
  }
    return(
        <div className="dashboard d-flex">
    	<div>
      	<AgentSideBar agent={agent}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AgentNavBar agentName={agent.firstName}/>
       
          <center>
          <table className='table table mt-5' style={{width:'35%'}}>
            <thead style={{backgroundColor:'#004E8F',color:'white'}}>
                <tr>
                    <td colSpan='2'>
                    <h1>Payment</h1>
                    </td>
                </tr>
            </thead>
            <tbody style={styles.myfont}>
                <tr>
                    <td>Customer</td>
                    <td>{customer.firstName} {customer.lastName}</td>
                </tr>
                <tr>
                    <td>Policy :</td>
                    <td>{premium.policy.policyName}</td>
                </tr>
                <tr>
                    <td>Agent</td>
                    <td>{agent.firstName} {agent.lastName}</td>
                </tr>
                <tr>
                    <td>Ammout :</td>
                    <td>{premium.premium}</td>
                </tr>
                <tr>
                    <td>Premium Date</td>
                    <td>{premium.premiumDate}</td>
                </tr>
            </tbody>
          </table>
          <button className='btn mt-3' style={styles.button} onClick={payNow}>Pay Now</button>
          </center>
        </div>
        </div>
       
    )
}
export default AgentPaynow
const styles={
    myfont: {
       
        textDecoration: "none",
        fontWeight: "bold",
        textAlign:"left",
      },
      button:  {
        borderRadius:'15px',
        backgroundColor:'#FFCB08',
        fontWeight:'bold',
        width:'250px'
      }
}