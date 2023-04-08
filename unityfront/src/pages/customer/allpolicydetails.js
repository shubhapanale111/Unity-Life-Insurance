import CustomerSideBar from './customersidebar'
import CustomerNavBar from './customernavbar';
import "./Dashboard.css";
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config'
import { toast } from 'react-toastify'

const AllPolicyDetails=()=>{
  let location=useLocation()
  let customer=location.state.customer
  let policy=location.state.policy
  const [allPolicyDetails,setcustomerpolicydetails]=useState([])
  const navigate=useNavigate()
  // console.log(policy);
  // console.log(customer);
  const backtoPlans = () => {
    navigate('/customerallplans', {state: { customer: customer, policy: policy } })
  }
    return(
        <div className="dashboard d-flex">
    	<div>
      	<CustomerSideBar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <CustomerNavBar customerName={customer.user.first_name}/>
        
              <><h1>Policy Detail</h1><center>
                <h1>{policy.policy_name}</h1>
                <br />
                <table className='table' style={{ width: '60%', border: '2px', borderBlockStyle: 'solid' }}>
                  <tbody style={styles.myfont}>
                    <tr>
                      <td>Id</td>
                      <td><h4>{policy.id}</h4></td>
                    </tr>
                    <tr>
                      <td>Policy Description</td>
                      <td>{policy.policy_description}</td>
                    </tr>
                    <tr>
                      <td>Monthly Premium</td>
                      <td>{policy.min_month_premium} - {policy.max_month_premium} Per Month </td>
                    </tr>
                    <tr>
                      <td>Tenure</td>
                  <td>{policy.min_period_months} - {policy.max_period_months} Months</td>
                    </tr>
                    <tr>
                      <td>Age Limit</td>
                      <td>{policy.min_entry_age}-{policy.max_entry_age} Years</td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={backtoPlans} className='btn btn-warning mt-3' style={{ width: '350px', borderRadius: '15px' }}>Back to Plans</button>
              </center></>
            
          
        </div>
        </div>

    )
}
export default AllPolicyDetails
const styles={
    myfont: {
       
        textDecoration: "none",
        fontWeight: "bold",
        textAlign:"left",
      },
}