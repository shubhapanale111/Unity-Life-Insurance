import CustomerSideBar from './customersidebar'
import CustomerNavBar from './customernavbar';
import "./Dashboard.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from './../config'
import { toast } from 'react-toastify'
const CustomerPolicyDetails=()=>{
  let location = useLocation()
  let Navigate = useNavigate()
  let customer=location.state.customer
  let policy = location.state.policy
  console.log(customer)
  console.log(policy)
  const [policydetails,setpolicydetails]=useState()
  const navigate=useNavigate()

  useEffect(()=>{
    if(!sessionStorage['token_CUSTOMER']){
      navigate('/signin')
    }else{
      getPolicyDetails()
    }
  },[]);
  
   const getPolicyDetails =()=> {
    axios.get(config.ExpressUrl+'/customer/getPolicyDetails/'+policy.id,{
      headers:{token:sessionStorage['token_CUSTOMER']},
    })
    .then((response)=>{
      const result = response.data
      console.log(result)
      if(result['status']==='success'){
        setpolicydetails(response.data.data)
        console.log(policydetails)
      }
    })
  }
  const claim=()=>{
    let policyEndDate=new Date(policy.policy_end_date);
    if(policyEndDate>new Date())
    {
      toast.error("Policy Can be Claimed After "+policyEndDate)
    }
    else{
      axios.put(`${config.ExpressUrl}/customer/applyForClaim/${policy.id}`, {
        headers:{token:sessionStorage['token_CUSTOMER']}
      })
      .then(response=>{toast.success("Requested For Claim Succesfully!!! ")
        Navigate("/CustomerPolicies",{state:{customer:customer}})
    })
      .catch(error=>toast.error("Claim Request Failed"));
    }
}
  const surrender=()=>{
    let policyStartDate=policy.policy_start_date;
let MonthsUpToDate=getMonthDifference(new Date(policyStartDate),new Date());
    if(MonthsUpToDate<6){
 //   console.log(MonthsUpToDate);
    toast.error("Miniumum 6 Months Tenure Should be Completed")
    }
    else{
      axios.put(`${config.ExpressUrl}/customer/applyForSurrender/${policy.id}`, {
        headers:{token:sessionStorage['token_CUSTOMER']}
      })
      .then(response=>{toast.success("Requested For Surrender Succesfully!!! ")
        Navigate("/CustomerPolicies",{state:{customer:customer}})
    })
      .catch(error=>toast.error("Surrender Request Failed"));
 }
}

    return(
        <div className="dashboard d-flex">
    	<div>
      	<CustomerSideBar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <CustomerNavBar customerName={customer.user.first_name}/>
        <center>
             <h1>PolicyDetails</h1>
             <br />

        <table className='table'  style={{width:'60%',border:'2px',borderBlockStyle:'solid'}}>
  <tbody style={styles.myfont}>
    <tr>
      <td><h4>Policy Name</h4></td>
                  <td><h4> {policy.policy_name} </h4></td>
                </tr>
                <tr>
      <td><h4>Policy Description</h4></td>
                  <td><h4>  {policy.policy_description}</h4></td>
    </tr>
    <tr>
      <td>Policy Holder Name</td>
                  <td>{customer.user.first_name} {customer.user.last_name}</td>
    </tr>
    <tr>
    <td>Start Date</td>
                  <td> {policy.policy_start_date}</td>
    </tr>
    <tr>
    <td>End Date</td>
                  <td>{policy.policy_end_date} </td>
    </tr>
    <tr>
    <td>Primium</td>
                  <td> {policy.premium}</td>
    </tr>
    <tr>
    <td>Premium Date</td>
                  <td>{policy.premium_date}</td>
                            </tr>
    </tbody>
                    </table>
                </center>
                <center>
                <table className='table' style={{ width: '60%' }}>
                    <tr>
                        <td>
                            <button className='btn btn-success mt-4' style={{ width: '350px', borderRadius: '15px',backgroundColor:'green' }} onClick={claim} >Claim</button>
                        </td>
                        <td>
                            <button className='btn btn-danger mt-4' style={{ width: '350px', borderRadius: '15px',backgroundColor:'red' }} onClick={surrender} >Surrender</button>
                            </td>
                        </tr>
                </table>
                </center>
            
          
        </div>
        </div>

    )
}
export default CustomerPolicyDetails
const styles={
    myfont: {
       
        textDecoration: "none",
        fontWeight: "bold",
        textAlign:"left",
      },
}
function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}