import AgentSideBar from "./agentSidebar";
import AgentNavBar from "./agentNavbar";
import "./Dashboard.css";
import { Col, InputGroup,Form, Row, Container, Button,} from "react-bootstrap";
import { Formik,Field } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../../App.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from './../config';
const schema = yup.object().shape({
  firstName: yup.string().required("Please Enter your First name"),
  lastName: yup.string().required("Please Enter your Last name"),
  phoneNumber: yup
    .string()
    .required("Enter mobile Number")
    .matches(
      /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
      "Please enter valid 10 digit number"
    ),
  email: yup
    .string()
    .required("Please Enter email address")
    .matches(
      /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email ID"
    ),
    dateOfBirth:yup.string().required("Please Select a Date of Birth"),
  
  addressLine1: yup.string().required("Please Enter your Address"),
  addressLine2: yup.string().required("Please Enter your Address"),
  pincode: yup
    .string()
    .required("Please Enter your pincode")
    .matches(
      /^\(?(\d{2})\)?[- ]?(\d{2})[- ]?(\d{2})$/,
      "Please enter valid 6 digit number"
    ),
  village: yup.string().required("Please Enter your village"),
  city: yup.string().required("Please Enter your city"),
  state: yup.string().required("Please Enter your state"),
  aadhar: yup.string().required("Please Enter your Adhar card Number"),
  pan: yup.string().required("Please Enter your PAN card Number"),
  
});

const AgentProfile=()=>{
  let location = useLocation()
  
  let agent = location.state.agent


  let panViewUrl=`${config.SpingUrl}/agent/getPanDoc/${agent.id}`
  let aadharViewUrl=`${config.SpingUrl}/agent/getAadharDoc/${agent.id}`
const [profileImage,setProfileImage]=useState();
const [aadharDoc,setAadharDoc]=useState();
const[panDoc,setPanDoc]=useState();
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
 
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
 
 
  if (token == null) {
    toast.error('Unauthorized access please login first')
    Navigate('/signin')
  }
  const updateProfileImage=()=>{
    if(profileImage==null)
    toast.error("Select Profile Image Image First")
    else{
    
    const body=new FormData();
    body.set('profileImage', profileImage);
  console.log(profileImage)
    
 
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post(`${config.SpingUrl}/agent/addProfileImage/${agent.id}`,body,{
    headers:{
      'Content-Type': 'multipart/form-data',
    }
    })
    .then((response)=>{
      
      if(response.status==201) 
      {
       
      toast.success("Profile Image Updated Successfully")
      window.location.reload(false);
    }
      else{
        toast.error("Failed to Update Image")
      }
    }).catch((error)=>{
      toast.error("Something Went Wrong")
    })
    }
  }
  const updateAadharDoc=()=>{
    if(aadharDoc==null)
    toast.error("Select Aadhar Doc Image First")
    else{
    
    const body=new FormData();
    body.set('aadharDoc', aadharDoc);
  console.log(aadharDoc)
     
 
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post(`${config.SpingUrl}/agent/addAadharDoc/${agent.id}`,body,{
    headers:{
      'Content-Type': 'multipart/form-data',
    }
    })
    .then((response)=>{
      
      if(response.status==201) 
      {
       
      toast.success("Aadhar Doc Updated Successfully")
      window.location.reload(false);
    }
      else{
        toast.error("Failed to Update Aadhar")
      }
    }).catch((error)=>{
      toast.error("Something Went Wrong")
    })
    }
  }
  const updatePanDoc=()=>{
    if(panDoc==null)
    toast.error("Select Pan Doc First")
    else{
    
    const body=new FormData();
    body.set('panDoc', panDoc);
  console.log(panDoc)
    
 
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post(`${config.SpingUrl}/agent/addPanDoc/${agent.id}`,body,{
    headers:{
      'Content-Type': 'multipart/form-data',
    }
    })
    .then((response)=>{
      
      if(response.status==201) 
      {
       
      toast.success("Pan Doc Updated Successfully")
      window.location.reload(false);
    }
      else{
        toast.error("Failed to Update Pan Doc")
      }
    }).catch((error)=>{
      toast.error("Something Went Wrong")
    })
    }
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
            console.log(values);
              let id=agent.id;
              let firstName = values.firstName
              let lastName=values.lastName
              let email=values.email
              let phoneNumber=values.phoneNumber
              let dateOfBirth=values.dateOfBirth
              let addressLine1=values.addressLine1
              let addressLine2=values.addressLine2
              let pincode=values.pincode
              let village=values.village
              let city=values.city
              let state=values.state
              let aadhar=values.aadhar
              let pan=values.pan
             
            console.log(dateOfBirth)
              axios
              .put(`${config.SpingUrl}/agent/updateAgent`, {},{
                params:{id,
                firstName,
                lastName,
                email,
                phoneNumber,
                dateOfBirth,
              
                addressLine1,
                addressLine2,
                pincode,
                village,
                city,
                state,
                aadhar,
                pan,
              }
              },
               
                
                
              
               
             
              
                
                
              ).then((response)=>{
                let customer=null;
                if(response.status==200)
               { toast.success("Agent Profile Updated SuccessFully")
                   agent=response.data;
                //console.log("customer==>>"+customer.id);
                Navigate("/agentDashboard",{state:{agent:agent}})
              }
              else
              {
                toast.error("Failed to add")
              }
              
              }).catch((error)=>{
                toast.error("Failed to Add Customer"+error)
              })
              
            }}
            initialValues={{
              firstName: agent.firstName,
              lastName: agent.lastName,
              email: agent.email,
              phoneNumber: agent.phoneNumber,
              dateOfBirth:agent.dateOfBirth,
              addressLine1: agent.address.addressLine1,
              addressLine2: agent.address.addressLine2,
              pincode: agent.address.pincode,
              village: agent.address.village,
              city: agent.address.city,
              state: agent.address.state,
              aadhar: agent.aadhar,
              pan:agent.pan,
             
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
                <center><h1>Agent Profile</h1></center>
                <Container style={styles.container}>
                  <Form
                    noValidate
                    onSubmit={handleSubmit}
                    style={styles.myfont} 
                  >
                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik01"
                      >
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                         // placeholder="Enter your First Name here"
                      
                         
                          value={values.firstName}
                          onChange={handleChange}
                          isValid={touched.firstName && !errors.firstName}
                          isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik02"
                      >
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Enter your Last Name here"
                          value={values.lastName}
                          onChange={handleChange}
                          isValid={touched.lastName && !errors.lastName}
                          isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik03"
                      >
                        <Form.Label>Mobile Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter your Number here"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          isValid={touched.phoneNumber && !errors.phoneNumber}
                          isInvalid={!!errors.phoneNumber}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.phoneNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik04"
                      >
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your Email here"
                          value={values.email}
                          onChange={handleChange}
                          isValid={touched.email && !errors.email}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik05"
                      >
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control
                          className="SignUpFormControls"
                          type="date"
                          name="dateOfBirth"
                          placeholder="Select Date Of Birth:"
                          value={values.dateOfBirth}
                          onChange={handleChange}
                          isValid={touched.dateOfBirth && !errors.dateOfBirth}
                          isInvalid={!!errors.dateOfBirth}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.dateOfBirth}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik06"
                      >
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control
                          className="SignUpFormControls"
                          type="text"
                          name="addressLine1"
                          placeholder="Enter your address here"
                          value={values.addressLine1}
                          onChange={handleChange}
                          isValid={touched.addressLine1 && !errors.addressLine1}
                          isInvalid={!!errors.addressLine1}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.addressLine1}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control
                          type="text"
                          name="addressLine2"
                          placeholder="Confirm your address here"
                          value={values.addressLine2}
                          onChange={handleChange}
                          isValid={touched.addressLine2 && !errors.addressLine2}
                          isInvalid={!!errors.addressLine2}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.addressLine2}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik08"
                      >
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                          type="text"
                          name="pincode"
                          placeholder="Enter your Pincode here"
                          value={values.pincode}
                          onChange={handleChange}
                          isValid={touched.pincode && !errors.pincode}
                          isInvalid={!!errors.pincode}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.pincode}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik09"
                      >
                        <Form.Label>Village</Form.Label>
                        <Form.Control
                          type="text"
                          name="village"
                          placeholder="Enter your Village here"
                          value={values.village}
                          onChange={handleChange}
                          isValid={touched.village && !errors.village}
                          isInvalid={!!errors.village}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.village}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik10"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="Enter your City here"
                          value={values.city}
                          onChange={handleChange}
                          isValid={touched.city && !errors.city}
                          isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.city}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik11"
                      >
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          type="text"
                          name="state"
                          placeholder="Enter your City here"
                          value={values.state}
                          onChange={handleChange}
                          isValid={touched.state && !errors.state}
                          isInvalid={!!errors.state}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.state}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik12"
                      >
                        <Form.Label>Aadhar Number</Form.Label>
                        <Form.Control
                          type="number"
                          name="aadhar"
                          placeholder="Enter your First Name here"
                          value={values.aadhar}
                          onChange={handleChange}
                          isValid={touched.aadhar && !errors.aadhar}
                          isInvalid={!!errors.aadhar}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.aadhar}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik13"
                      >
                        <Form.Label>Pan Card Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="pan"
                          placeholder="Enter your Pan Number here"
                          value={values.pan}
                          onChange={handleChange}
                          isValid={touched.pan && !errors.pan}
                          isInvalid={!!errors.pan}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.pan}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className='mb-2'>
                    <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik11"
                      >
                    
                    <input
          onChange={(e) => {
           
            setProfileImage(e.target.files[0])
          }}
          className='form-control'
          type='file'
        /></Form.Group> <Form.Group
        as={Col}
        md="6"
        controlId="validationFormik11"
      ><Button onClick={updateProfileImage} title='Upload Photo'>Update Profile Image</Button>
                </Form.Group>    </Row>
                <Row className='mb-2'>
                    <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik11"
                      >
                    
                    <input
          onChange={(e) => {
           
            setAadharDoc(e.target.files[0])
          }}
          className='form-control'
          type='file'
        /></Form.Group> <Form.Group
        as={Col}
        md="6"
        controlId="validationFormik11"
      ><Button onClick={updateAadharDoc} title='Upload Photo' >Update Aadhar</Button>
      <Button onClick={()=>{window.open(aadharViewUrl,"_blank")}} className='btn btn-success'>View Aadhar</Button>
                </Form.Group>    </Row>
                <Row className='mb-2'>
                    <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik11"
                      >
                    
                    <input
          onChange={(e) => {
           
            setPanDoc(e.target.files[0])
          }}
          className='form-control'
          type='file'
        /></Form.Group> <Form.Group
        as={Col}
        md="6"
        controlId="validationFormik11"
      ><Button onClick={updatePanDoc} title='Upload Photo'>Update Pan Doc</Button>
      <Button onClick={()=>{window.open(panViewUrl,"_blank")}} className='btn btn-success'>View Pan</Button>
                </Form.Group>    </Row>
                
                    <Row>
                    <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik14"
                      >
                       
                        <Button
                          type="submit"
                          variant="outline-secondary"
                          style={styles.signinButton}
                        >
                         Update Profile
                        </Button>
                      </Form.Group>
                    </Row>
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
export default AgentProfile;
const styles = {
  container: {
    width: 600,
    height: "auto",
    padding: 20,
    position: "relative",
    top: 10,
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
