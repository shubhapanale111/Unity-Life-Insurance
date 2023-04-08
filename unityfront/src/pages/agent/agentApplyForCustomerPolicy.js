import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import "./Dashboard.css";
import { Col, InputGroup, Row, Container, Button,} from "react-bootstrap";
import { Formik,Field,Form, ErrorMessage } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../../App.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../config";
// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
// const FILE_SIZE = 1024 * 1024;



const AgentApplyForCustomerPolicy = () => {
    let location = useLocation()
  
    let agent = location.state.agent
    let customer=location.state.customer
    let policy=location.state.policy
    
    const schema = yup.object().shape({
        premium:yup.number()
        .min(policy.minMonthPremium, "premium must be more than "+policy.minMonthPremium)
        .max(policy.maxMonthPremium, "premium must be less than "+policy.maxMonthPremium)
        .required("Please Enter Premium Amount"),
        tenure:yup.number()
        .min(policy.minPeriodMonths, "Tenure must be more than "+policy.minPeriodMonths)
        .max(policy.maxPeriodMonths, "Tenure must be less than "+policy.maxPeriodMonths)
        .required("please  Enter Tenure"),
     });
 
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
 

 
  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  return (
    <div className="dashboard d-flex" >
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
        <div>
          <Formik 
            validationSchema={schema}
            onSubmit={(values) => {
           
            let tenure=values.tenure;
             let status=false;
             let policyStartDate=new Date();
            
             let policyEndDate=getPolicyEndDate(tenure,new Date());
             let premium=values.premium;
             let claimAmount=calculateClaimAmount(premium,policy.perAnnumRate,tenure);
             let claimDate=getClaimDate(new Date(),tenure+1);
             let premiumDate=new Date();
             console.log(values)
             console.log("status==>"+status)
             console.log("policStartDate"+policyStartDate);
             console.log("policyEndDate"+policyEndDate)
             console.log("claimAmount"+claimAmount);
             console.log("claimDate"+claimDate)
             console.log("premiumDate"+premiumDate);
             axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
              axios
              .post(`${config.SpingUrl}/agent/addMyCustomersPolicy/agent/${agent.id}/customer/${customer.id}/policy/${policy.id}`, {
                policyStartDate,
                policyEndDate,
                claimAmount,
                claimDate,
                status,
                premium,
                premiumDate,

              },{
               }).then((response)=>{
                let customer=null;
                if(response.status==200)
               { toast.success("Applied Successfully\n  Request Sent For Verification")
                 
                  console.log(response.data)
                  Navigate('/agentAppliedPolicies',{state:{agent:agent}})
               
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
                  <h1>{policy.policyName}</h1>
                      <Form
                         noValidate
                         onSubmit={handleSubmit}
                         style={styles.myfont} >
                        <label>Premium in INR</label>
                        <input 
                        type="Number"
                        name="premium"
                        className='form-control'
                       onChange={handleChange}/>
                       <ErrorMessage name="premium"  />
                       <br/>
                       <label>Tenure in Months</label>
                        <input 
                        type="Number"
                        name="tenure"
                        className='form-control'
                       onChange={handleChange}/>
                       <ErrorMessage name="tenure"/>
                       <br/>
                       
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
export default AgentApplyForCustomerPolicy;
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
  