import CustomerSideBar from "./customersidebar";
import CustomerNavBar from "./customernavbar";
import "./Dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "./../config";
import { date } from "yup";
import Moment from "moment/moment";

const CustomerPaynow = () => {
  let location = useLocation()
  let navigate = useNavigate()
  let customer = location.state.customer
  let policy = location.state.policy
  //console.log(customer)
  //console.log(policy)
  const Navigate = useNavigate()
  useEffect(() => {
    if (!sessionStorage['token_CUSTOMER']) {
      navigate('/signin')
    }
  }, []);
  const payNow = () => {
    let customerId = customer.user.id;
    let policyId = policy.policy_id;
    let amount = policy.premium
    let preDate = getUpdatedPremiumDate(new Date(policy.premium_date))
    let premium_date = Moment(preDate).format('YYYY-MM-DD')
    console.log(premium_date)
    //   console.log(customerId)
    //   console.log(policyId)
    //   console.log(amount)
    axios.post(`${config.ExpressUrl}/customer/payMyCustomersPremium`, {
        
      customerId,
      policyId,
      amount,
      premium_date
    }
      , {
        headers: { token: sessionStorage['token_CUSTOMER'] },
      }).then((response) => {
        if (response.data.status != 'error') {
          console.log(response.data)
          const policyID= policy.id
          axios.put
            (`${config.ExpressUrl}/customer/${customerId}/updateCustomersPremiumDate`, { premium_date,policyID }
              , { headers: { token: sessionStorage['token_CUSTOMER'] }, }).
            then((response) => {
              if (response.data.status != 'error') {
                console.log(response.data)
                Navigate("/customerPremiumPayments", { state: { customer: customer } })
              }
            }).catch(error => toast.error("Premium Paid Failed " + error))
        }
        toast.success("Premium Paid SuccessFully")
      }
      ).catch(error => toast.error("Premium Paid Failed " + error))
  }
    return (
      <div className="dashboard d-flex">
        <div>
          <CustomerSideBar customer={customer} />
        </div>
        <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "auto" }}>
          <CustomerNavBar customerName={customer.first_name} />
          <center>
            <table className='table table mt-5' style={{ width: '35%' }}>
              <thead style={{ backgroundColor: '#004E8F', color: 'white' }}>
                <tr>
                  <td colSpan='2'>
                    <h1>Payment</h1>
                  </td>
                </tr>
              </thead>
              <tbody style={styles.myfont}>
                <tr>
                  <td>Customer</td>
                  <td>{customer.user.first_name} {customer.user.last_name}</td>
                </tr>
                <tr>
                  <td>Policy :</td>
                  <td>{policy.policy_id}</td>
                </tr>
                <tr>
                  <td>Ammout :</td>
                  <td>{policy.premium}</td>
                </tr>
                <tr>
                  <td>Premium Date</td>
                  <td>{policy.premium_date}</td>
                </tr>
              </tbody>
            </table>
            <button className='btn mt-3' style={styles.button} onClick={payNow}>Pay Now</button>
          </center>
        </div>
      </div>
       
    )
}
const styles = {
  myfont: {
     
    textDecoration: "none",
    fontWeight: "bold",
    textAlign: "left",
  },
  button: {
    borderRadius: '15px',
    backgroundColor: '#FFCB08',
    fontWeight: 'bold',
    width: '250px'
  }
}
function getUpdatedPremiumDate(date) {
  date.setMonth(date.getMonth() + 1);
  return date;
}
export default CustomerPaynow

