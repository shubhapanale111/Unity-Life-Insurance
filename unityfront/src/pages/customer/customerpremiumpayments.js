import CustomerSideBar from './customersidebar'
import CustomerNavBar from './customernavbar';
import "./Dashboard.css";
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { toast } from 'react-toastify'
import config from './../config'
import { useEffect,useState } from "react";
import {Navigate, useNavigate,useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const CustomerPremiumPayments = () => {
  let location = useLocation()
  let customer=location.state.customer
  //console.log(customer.user.id);
  const [customerMyPolicies, setCustomerMyPolicies] = useState([]);
  const navigate = useNavigate()
  //console.log(sessionStorage['token_CUSTOMER']);
  useEffect(() => {
   if(!sessionStorage['token_CUSTOMER']){
    navigate('/signin')
   }else{
    getMyPolicies()
   }
  }, []);


  const getMyPolicies = () => {
    axios
      .get(config.ExpressUrl + `/customer/${customer.user.id}/mypremiumpendingpolicies`, {
        headers: { token: sessionStorage['token_CUSTOMER'] },
      })
      .then((response) => {
        const result = response.data
        console.log(result)
        if (result['status'] === 'success') {
          console.log(result)
          // set the homes to the state member
          setCustomerMyPolicies(response.data.data)
        } else {
          toast.error(result['error'])
        }
      })
  }
    return(
        <div className="dashboard d-flex">
    	<div>
      	<CustomerSideBar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <CustomerNavBar customerName={customer.user.first_name}/>
        <h1 style={{marginBottom:'40px',marginLeft:'10px',textAlign:'center'}}><b>My Policies</b></h1>
        <table className='table table-striped'>
        <thead>
          <tr>
          
          <th>Policy Id</th>
          <th>Premium</th>
          <th>Premium Date</th>
          <th>Policy Start Date</th>
          <th>Policy End Date</th>
          <th>Claim Amount</th>

          </tr>
        </thead>
        <tbody>

          {customerMyPolicies.map((list) => {
            return (
              <tr>
                <td>{list.policy_id}</td>
                <td>{list.premium}</td>
                <td>{list.premium_date}</td>
                <td>{list.policy_start_date}</td>
                <td>{list.policy_end_date}</td>
                <td>{list.claim_amount}</td>
                <td><Link to="/customerpaynow"  style={styles.button} className='btn btn-warning' state={{customer:customer,policy:list}}>Pay Now</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
        </div>
        </div>

    )
}
export default CustomerPremiumPayments
const styles={
  button:  {
      borderRadius:'15px',
    }
}