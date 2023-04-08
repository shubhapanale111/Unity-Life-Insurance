import { Col,Form,InputGroup,Row,Container,Button } from "react-bootstrap"
import { Formik } from "formik";
import Navbar from "../../components/navbar";
import { Link } from 'react-router-dom'
import * as yup from "yup";
import '../../App.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom' ;
import { toast } from "react-toastify";
import config from './../config';
const schema = yup.object().shape({
  firstName: yup.string().required("Please Enter your First name"),
  lastName: yup.string().required("Please Enter your Last name"),
  email: yup.string().required("Please Enter email address").matches(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Invalid email ID"),
  mobileNumber: yup.string().required("Enter mobile Number").matches(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,"Please enter valid 10 digit number"),
  password: yup.string()
  .required("Please Enter your Password")
  .max(25)
  .matches(/^(?=.{8,})/, "Must Contain 8 Characters")
  .matches(
    /^((?=.*[a-z]){1})((?=.*[A-Z]){1})/,
    "Must Contain One Uppercase, One Lowercase"
  )
  .matches(
    /(\W)/,
    "Must Contain One Special Case Character"
  )
  .matches(/(?=.*\d)/, "Must Contain One Number"),
  confirmPassword: yup.string().required("Please confirm your Password").oneOf([yup.ref("password"), null], "Passwords must match"),

});

function Signup() {
  const Navigate=useNavigate();
  
  return (
    <div className='signin' style={{overflowY:'auto'}}>
       <Navbar />
    <Formik
      validationSchema={schema}
     
      initialValues={{
    firstName: '',
        lastName: '',
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
   
      }}

      onSubmit={(values)=>{
        
        let firstName=values.firstName;
        let lastName=values.lastName;
        let phoneNumber=values.mobileNumber;
        let email=values.email;

        let password=values.password;
       
        let role=values.role;
       
        let url="";
        if(role=="AGENT"){
         url=`${config.SpingUrl}/agent/signup`;
        }else {
          url=`${config.ExpressUrl}/customer/signup`;}
        axios.post(url,{
          
          firstName,
          lastName,
          phoneNumber,
           email,
           password
          
       }).then((response)=>{
          const result=response.data;
          console.log(response.data.status);
         console.log(response.data)
          if (response.status == 201||response.data.status!="error") {
            toast.success('SuccessFully Signed Up');
           
            Navigate('/signin');
             
            } 
            else{

            }
       }).catch((error)=>{
       toast.error("Sign Up Failed"+error)
          console.log('error')
          console.log(error)
       })

        
      
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
      }) => (
        <div className="container-fluid">
          <Container style={styles.container}>
            <Form noValidate onSubmit={handleSubmit} style={styles.myfont} >
              <Row className="mb-2">
              <Form.Group as={Col} md="12" controlId="validationFormik02">
                    <Form.Label>Role</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Select
                        aria-label="Default select example"
                        name="role"
                        onChange={handleChange}
                        value={values.role}
                      >
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="AGENT">AGENT</option>
                        
                      </Form.Select>
                    </InputGroup>
                  </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                      name="firstName"
                      placeholder="Enter your First Name here"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback className="FeedBack" type="invalid">{errors.firstName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik02">
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
                  <Form.Control.Feedback className="FeedBack" type="invalid">{errors.lastName}</Form.Control.Feedback>
                </Form.Group>
               
              </Row>
              <Row className="mb-2">
                <Form.Group as={Col} md="6" controlId="validationFormik03">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                      name="mobileNumber"
                      placeholder="Enter your Number here"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    isValid={touched.mobileNumber && !errors.mobileNumber}
                    isInvalid={!!errors.mobileNumber}
                  />
                  <Form.Control.Feedback className="FeedBack" type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik04">
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
                 <Form.Control.Feedback className="FeedBack" type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-1">
                <Form.Group as={Col} md="6" controlId="validationFormik05">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="SignUpFormControls"
                    type="password"
                      name="password"
                      placeholder="Enter your Password here"
                    value={values.password}
                    onChange={handleChange}
                  isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                   <Form.Control.Feedback className="FeedBack" type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationFormik06">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                      name="confirmPassword"
                      placeholder="Confirm your Password here"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={!!errors.confirmPassword} 
                  />
                  <Form.Control.Feedback className="FeedBack" type="invalid">
          {errors.confirmPassword}
        </Form.Control.Feedback>
                </Form.Group>
              </Row>
           
              <Row>
              <Form.Group as={Col} md="12" className="mb-2" controlId="validationFormik08">
              <Button
                type="submit"
                variant="outline-secondary"
                style={styles.signinButton}
              >
                Sign-up
                    </Button>
                    <div>
            Already have an account? <Link to='/signin'>Signin here</Link>
          </div>
                  </Form.Group>
                </Row>
            </Form>
          </Container>
        </div>
      )}
      </Formik>
      </div>
  );
}
const styles = {
  container: {
    top:150,
    maxWidth: '500px',
    minWidth: '300px',
    maxHeight: '100vh',
   marginTop:'200px',
    borderRadius: '25px',
    width: '100%',
    padding: 20,
    overflow: 'auto',
    //position: 'relative',
    margin: 'auto',
   borderColor: 'white',
  // borderRadius: 10,
   broderWidth: 1,
   borderStyle: 'solid',
  //  boxShadow: '1px 1px 20px 5px white',
  background: "rgba(0,1, 0, 1)",

  
  },
  signinButton: {
    position: 'relative',
    width: '100%',
    height: 40,
    backgroundColor: '#FFCB08',
    color: 'black',
    borderRadius: 5,
    border: 'none',
    marginTop: 10,
    fontWeight: 'bold',
  },
  myfont: {
    marginRight: '10px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
export default Signup;
