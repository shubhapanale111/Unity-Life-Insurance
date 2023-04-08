import AdminSideBar from './adminsidebar'
import AdminNavBar from './adminnavbar';
import "./Dashboard.css";
import { useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { Col, InputGroup,Form, Row, Container, Button,} from "react-bootstrap";
import { Formik,Field } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import config from './../config';
import * as yup from "yup";
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

  
});
const AdminProfile = () => {
  const Navigate = useNavigate()
  let location=useLocation()
 let admin=location.state.admin
const [file,setFile]=useState();
  useEffect(() => {
    if (!sessionStorage["token_ADMIN"]) {
      Navigate("/signin");
    }
  }, []);
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const updateProfileImage=()=>{
    if(file==null)
    toast.error("Select Policy Image First")
    else{
    
    const body=new FormData();
    body.set('profileImage', file);
  console.log(file)
    
 
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.post(`${config.SpingUrl}/admin/addProfileImage/${admin.id}`,body,{
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
    return(
        <div className="dashboard d-flex">
    	<div>
      	<AdminSideBar admin={admin}/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"auto"}}>
        <AdminNavBar adminName={admin.firstName}/>
        <div>
          <Formik 
            validationSchema={schema}
            onSubmit={(values) => {
            console.log(values);
              let id=admin.id;
              let firstName = values.firstName
              let lastName=values.lastName
              let email=values.email
              let phoneNumber=values.phoneNumber
              let addressLine1=values.addressLine1
              let addressLine2=values.addressLine2
              let pincode=values.pincode
              let village=values.village
              let city=values.city
              let state=values.state
             
             
        
              axios
              .put(`${config.SpingUrl}/admin/updateAdmin`, {},{
                params:{id,
                firstName,
                lastName,
                email,
                phoneNumber,
                
              
                addressLine1,
                addressLine2,
                pincode,
                village,
                city,
                state,
                
              }
              },
               
                
                
              
               
             
              
                
                
              ).then((response)=>{
               
                if(response.status==200)
               { toast.success("Admin Profile Updated SuccessFully")
                   admin=response.data;
             
                Navigate("/admindashboard",{state:{admin:admin}})
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
              firstName: admin.firstName,
              lastName: admin.lastName,
              email: admin.email,
              phoneNumber: admin.phoneNumber,
              addressLine1: admin.address.addressLine1,
              addressLine2: admin.address.addressLine2,
              pincode: admin.address.pincode,
              village: admin.address.village,
              city: admin.address.city,
              state: admin.address.state,
             
             
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
                <center><h1>Admin Profile</h1></center>
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
                    <br></br>
                   
                    <Row className='mb-2'>
                    <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik11"
                      >
                    
                    <input
          onChange={(e) => {
           
            setFile(e.target.files[0])
          }}
          className='form-control'
          type='file'
        /></Form.Group> <Form.Group
        as={Col}
        md="6"
        controlId="validationFormik11"
      ><Button onClick={updateProfileImage} title='Upload Photo'>Update Image</Button>
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
export default AdminProfile;
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
