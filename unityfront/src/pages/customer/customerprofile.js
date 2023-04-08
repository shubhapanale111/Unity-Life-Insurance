import CustomerSideBar from "./customersidebar";
import CustomerNavBar from "./customernavbar";
import "./Dashboard.css";
import Footer from "../user/footer";
import { Col, InputGroup,Form, Row, Container, Button,} from "react-bootstrap";
import { Formik, Field } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../../App.css";
import { useState, useEffect} from "react";
import moment from "moment/moment";
import { toast } from "react-toastify";
import axios from "axios";
import config from './../config';
const schema = yup.object().shape({
  first_name: yup.string().required("Please Enter your First name"),
  last_name: yup.string().required("Please Enter your Last name"),
  phone_number: yup
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
    date_of_birth:yup.string().required("Please Select a Date of Birth"),
  
  address_line1: yup.string().required("Please Enter your Address"),
  address_line2: yup.string().required("Please Enter your Address"),
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

const CustomerProfile=()=>{
  let location = useLocation()
  let customer = location.state.customer.user
  let customerUser = location.state.customer
  let panViewUrl=`${config.SpingUrl}/customer/getPanDoc/${customer.id}`
  let aadharViewUrl=`${config.SpingUrl}/customer/getAadharDoc/${customer.id}`
const [profileImage,setProfileImage]=useState();
const [aadharDoc,setAadharDoc]=useState();
const[panDoc,setPanDoc]=useState();
console.log(customer)
const [token, setToken] = useState(sessionStorage.getItem('token_CUSTOMER'))
const updateProfileImage=()=>{
  if(profileImage==null)
  toast.error("Select Profile Image Image First")
  else{
  
  const body=new FormData();
  body.set('profileImage', profileImage);
console.log(profileImage)
  

  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  axios.post(`${config.SpingUrl}/customer/addProfileImage/${customer.id}`,body,{
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
  axios.post(`${config.SpingUrl}/customer/addAadharDoc/${customer.id}`,body,{
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
  axios.post(`${config.SpingUrl}/customer/addPanDoc/${customer.id}`,body,{
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
// console.log(customer)
 // console.log(sessionStorage['token_CUSTOMER'])
  const Navigate = useNavigate()
  useEffect(() => {
    if(!sessionStorage['token_CUSTOMER']){
     Navigate('/signin')
    }
  }, []);
  
  const uploadDocs = () => {
    Navigate('/customerUploadDocuments', { state: { customer: customer } })
  }
  return (
    <div>
    <div className="dashboard d-flex" >
      <div>
        <CustomerSideBar customer={customer} />
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
        <CustomerNavBar customerName={customer.first_name}/>
        <div>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
             // console.log(values);
             // let id = customer.id;
              let first_name = values.first_name
              let last_name = values.last_name
              let email = values.email
              let phone_number = values.phone_number
              let date_of_birth =  moment(values.date_of_birth).format("YYYY-DD-MM")
              let address_line1 = values.address_line1
              let address_line2 = values.address_line2
              let pincode = values.pincode
              let village = values.village
              let city = values.city
              let state = values.state
              let aadhar = values.aadhar
              let pan = values.pan
              let age = yearsDiff(date_of_birth,Date.now())
              function yearsDiff(d1, d2) {
                let date1 = new Date(d1);
                let date2 = new Date(d2);
                let yearsDiff =  date2.getFullYear() - date1.getFullYear();
                return yearsDiff;
              }
              //console.log(age)
              //console.log(dateOfBirth)
              //console.log(customer)
             // console.log(`${config.serverURL}/updateprofile/${customer.user.id}`)
              axios
                .put(`${config.ExpressUrl}/customer/updateprofile/${customer.id}`, {
                  first_name,
                  last_name,
                  email,
                  phone_number,
                  date_of_birth,
                  address_line1,
                  address_line2,
                  pincode,
                  village,
                  city,
                  state,
                  aadhar,
                  pan,
                  age,
                }, {
                  headers: {
                    token: sessionStorage['token_CUSTOMER']
                }}
              ).then((response)=>{
                if(response.status==200)
                {
                  toast.success("Customer Profile Updated SuccessFully")
                  axios.get(config.ExpressUrl+`/customer/profile/${customer.id}`,{
                    headers:{token:sessionStorage['token_CUSTOMER']},
                  })
                  .then((response)=>{
                    const result=response.data
                    if(result['status']==='success'){
                      customerUser.user = response.data.data[0]
                      console.log(response.data)
                    //  console.log(customer)
                       Navigate("/customerDashboard",{state:{customer:customerUser}})
                    }else{
                      toast.error(result['error'])
                    }
                  })
                  //customer = response.data.data;
                 // console.log(customer)
               // Navigate("/customerDashboard",{state:{customer:location.state.customer}})
              }
              else
              {
                toast.error("Failed to add")
              }
              
              }).catch((error) => {
                console.log(error)
                toast.error("Failed to Add Customer"+error)
              })
            }}
            initialValues={{
              first_name: customer.first_name,
              last_name: customer.last_name,
              email: customer.email,
              phone_number: customer.phone_number,
              date_of_birth: moment(customer.date_of_birth).format("YYYY-DD-MM"),
              address_line1: customer.address_line1,
              address_line2: customer.address_line2,
              pincode: customer.pincode,
              village: customer.village,
              city: customer.city,
              state: customer.state,
              aadhar: customer.aadhar,
              pan:customer.pan,    
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
                <center><h1>Customer Profile</h1></center>
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
                          name="first_name"
                         // placeholder="Enter your First Name here"
                          value={values.first_name}
                          onChange={handleChange}
                          isValid={touched.first_name && !errors.first_name}
                          isInvalid={!!errors.first_name}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.first_name}
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
                          name="last_name"
                          placeholder="Enter your Last Name here"
                          value={values.last_name}
                          onChange={handleChange}
                          isValid={touched.last_name && !errors.last_name}
                          isInvalid={!!errors.last_name}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.last_name}
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
                          name="phone_number"
                          placeholder="Enter your Number here"
                          value={values.phone_number}
                          onChange={handleChange}
                          isValid={touched.phone_number && !errors.phone_number}
                          isInvalid={!!errors.phone_number}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.phone_number}
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
                          name="date_of_birth"
                          placeholder="Select Date Of Birth:"
                          value={values.date_of_birth}
                          onChange={handleChange}
                          isValid={touched.date_of_birth && !errors.date_of_birth}
                          isInvalid={!!errors.date_of_birth}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.date_of_birth}
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
                          name="address_line1"
                          placeholder="Enter your address here"
                          value={values.address_line1}
                          onChange={handleChange}
                          isValid={touched.address_line1 && !errors.address_line1}
                          isInvalid={!!errors.address_line1}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.address_line1}
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
                          name="address_line2"
                          placeholder="Confirm your address here"
                          value={values.address_line2}
                          onChange={handleChange}
                          isValid={touched.address_line2 && !errors.address_line2}
                          isInvalid={!!errors.address_line2}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.address_line2}
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
                          placeholder="Enter your Last Name here"
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
                          //onClick={uploadDocs}
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
    </div>
  );
};
export default CustomerProfile;
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
