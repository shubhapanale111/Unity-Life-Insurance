import CustomerSideBar from "./customersidebar";
import CustomerNavBar from "./customernavbar";
import "./Dashboard.css";
import Moment from 'moment';
import { Col, InputGroup,Form, Row, Container, Button,} from "react-bootstrap";
import { Formik,Field, ErrorMessage } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../../App.css";
import { useState,moment } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "./../config";
// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
// const FILE_SIZE = 1024 * 1024;

const ApplyForCustomerPolicy = () => {
    let location = useLocation()
    let customer=location.state.customer
    let policy = location.state.policy
    // console.log(customer.user.id)
    // console.log(policy.id)
    const schema = yup.object().shape({
        premium:yup.number()
        .min(policy.min_month_premium, "premium must be more than "+policy.min_month_premium)
        .max(policy.max_month_premium, "premium must be less than "+policy.max_month_premium)
        .required("Please Enter Premium Amount"),
        tenure:yup.number()
        .min(policy.min_period_months, "Tenure must be more than "+policy.min_period_months)
        .max(policy.max_period_months, "Tenure must be less than "+policy.max_period_months)
        .required("please  Enter Tenure"),
     });
 
  const Navigate = useNavigate()
    if (sessionStorage.getItem('token_CUSTOMER') == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  return (
    <div className="dashboard d-flex" >
      <div>
        <CustomerSideBar agent={customer} />
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
        <div>
          <Formik 
            validationSchema={schema}
            onSubmit={(values) => {
            let tenure=values.tenure;
             let status=false;
              let psd = new Date()
              let policy_start_date=Moment(psd).format("YYYY-MM-DD")
              let ped= getPolicyEndDate(tenure,new Date);
              let policy_end_date = Moment(ped).format("YYYY-MM-DD")
             let premium=values.premium;
             let claim_amount = calculateClaimAmount(premium, policy.per_annum_rate, tenure);
             let cd=getClaimDate(new Date(),tenure+1)
              let claim_date=Moment(cd).format("YYYY-MM-DD")
              let pd=new Date()
             let premium_date=Moment(pd).format("YYYY-MM-DD")
            //  console.log("status==>"+status)
            //  console.log("policStartDate"+policy_start_date);
            //  console.log("policyEndDate"+policy_end_date)
            //  console.log("claimAmount"+claim_amount);
            //  console.log("claimDate"+claim_date)
            //   console.log("premiumDate" + premium_date);
              axios
              .post(`${config.ExpressUrl}/customer/${customer.user.id}/buypolicy/${policy.id}`, {
                policy_start_date,
                policy_end_date,
                claim_amount,
                claim_date,
                status,
                premium,
                premium_date,
              },{headers:{token:sessionStorage['token_CUSTOMER']}
              }).then((response) => {
                console.log(response.data)
                if(response.data.status!='error')
                {
                    toast.success("Applied Successfully\n  Request Sent For Verification")
                    Navigate("/customerDashboard",{state:{customer:customer}})
              }
              else
              {
                toast.error("Failed to Apply")
              }
              
              }).catch((error)=>{
                toast.error("Failed to Apply"+error)
              })
              
            }}
            initialValues={{
             premium:"",
             tenure:"",
             
             
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
              setFieldValue
            }) => (
              <div >
               
                <Container style={styles.container}>
                  <h1>{policy.policy_name}</h1>
                      <Form
                         noValidate
                         onSubmit={handleSubmit}
                         style={styles.myfont} >
                       <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik05"
                      >
                        <Form.Label>Premium in INR</Form.Label>
                        <Form.Control
                          className="SignUpFormControls"
                          type="number"
                          name="premium"
                          placeholder="Select Premium Amount"
                          value={values.premium}
                          onChange={handleChange}
                          isValid={touched.premium && !errors.premium}
                          isInvalid={!!errors.premium}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.premium}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik05"
                      >
                        <Form.Label>Tenure in Months</Form.Label>
                        <Form.Control
                          className="SignUpFormControls"
                          type="number"
                          name="tenure"
                          placeholder="Select Tenure"
                          value={values.tenure}
                          onChange={handleChange}
                          isValid={touched.tenure && !errors.tenure}
                          isInvalid={!!errors.tenure}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.tenure}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                        <Button
                          type="submit"
                          variant="outline-secondary"
                          style={styles.signinButton}
                        >
                         Apply
                        </Button>
                      </Form>
                    </Container>
                
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default ApplyForCustomerPolicy;
const styles = {
  container: {
    width: 600,
    height: "auto",
    padding: 20,
    position: "relative",
    top: 100,
    left: "auto",
    right: 0,
    bottom: 0,
    margin: "auto",
    borderColor: "#004E8F",
    borderRadius: 10,
    broderWidth: 1,
    borderStyle: "solid",
    boxShadow: "1px 1px 20px 5px white",
  },
  signinButton: {
    position: "relative",
    width: "100%",
    height: 40,
    backgroundColor: "#FFCB08",
    color: "black",
    borderRadius: 5,
    border: "none",
    marginTop: 10,
    fontWeight: "bold",
  },
  myfont: {
    marginRight: "10px",
    color: "#004E8F",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
function getPolicyEndDate(numOfMonths, date) {
   
    date.setMonth(date.getMonth()+ numOfMonths);
  
    return date;
  }
  function calculateClaimAmount(premium,perAnnumRate,tenure) {
    
   let claimAmount=((premium*tenure*perAnnumRate)/100)+(premium*tenure)
    return claimAmount;
  }
  function getClaimDate(date,tenure) {
    date.setMonth(date.getMonth() + tenure);
    return date;
  }