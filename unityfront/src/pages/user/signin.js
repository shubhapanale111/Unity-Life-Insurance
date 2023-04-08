import { Col, Form, InputGroup, Row, Container, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import Navbar from '../../components/navbar'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import './user.css'
import '../../App.css'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import config from '../config'
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please Enter email address')
    .matches(
      /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email ID',
    ),
  password: yup
    .string()
    .required('Please Enter your Password')
    .max(25)
    .matches(/^(?=.{8,})/, 'Must Contain 8 Characters')
    .matches(
      /^((?=.*[a-z]){1})((?=.*[A-Z]){1})/,
      'Must Contain One Uppercase, One Lowercase',
    )
    .matches(/(\W)/, 'Must Contain One Special Case Character')
    .matches(/(?=.*\d)/, 'Must Contain One Number'),
})

const Signin = () => {
  const Navigate = useNavigate()

  return (
    <div className="signin">
      <Navbar />
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          let email = values.email

          let password = values.password
          let role = values.role
          
          let url="";
          if(role==="CUSTOMER")
         url=`${config.ExpressUrl}/customer/signin`;
          else if(role==="AGENT"||role==="ADMIN")
          url=`${config.SpingUrl}/user/signin`;
         
            axios
              .post(url, {
                email,
                password,
              })
              .then((response) => {
                let user=null;
                console.log(response.data);
                if(role=="CUSTOMER")
                {
                  if(response.data.status!="error")
                  {
                     user=response.data.data;
                  }
                }
                else if(role=="AGENT"||role=="ADMIN")
                {
                  if(response.status==200)
                  {
                     user=response.data;
                  }
                }
                  sessionStorage.setItem(`token_${user.role}`,user.token)
                  toast.success('WELCOME TO Unity Life INSURANCE')
                  console.log("UserID==>"+user.id);
                
                 if(role==="ADMIN")
                 Navigate('/admindashboard',{state:{admin:user}})
                 else if(role=="AGENT")
                 Navigate('/agentdashboard',{state:{agent:user}})
                 else
                  Navigate('/customerdashboard',{state:{customer:user}})
                } 
              )
              .catch((error) => {
                console.log("error"+error)
                toast.error(error)
                toast.error('Please enter valid email or password');
              })
          
        }}
        initialValues={{
          email: '',
          password: '',
        }}
      >
        {({
          handleSubmit,
          handleChange,

          values,
          touched,

          errors,
        }) => (
          <div style={styles.myfont}>
          <Form noValidate onSubmit={handleSubmit} style={styles.container}>
            <Row className="mb-2">
              
                  <Form.Group as={Col}  md="12" controlId="validationFormik02">
                    <Form.Label>Role</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Select
                        
                        name="role"
                        onChange={handleChange}
                        value={values.role}
                      >
                        <option>Choose a Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="AGENT">AGENT</option>
                        <option value="CUSTOMER">CUSTOMER</option>
                      </Form.Select>
                    </InputGroup>
                </Form.Group>
                 </Row>
            <Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your Email ID here"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback className="FeedBack" type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
            </Row>
            <Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik05">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="SignUpFormControls"
                      type="password"
                      placeholder="Enter your Password here"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback className="FeedBack" type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                    <Link to="/forgotPassword">Forgot Password</Link>
                  </Form.Group>
            </Row>
            <Row>
                  <Form.Group
                    as={Col}
                    md="12"
                    className="mb-2"
                    controlId="validationFormik08"
                  >
                    <Button
                      type="submit"
                      variant="outline-secondary"
                      style={styles.signinButton}
                    >
                      Sign-in
                    </Button>
                    <div>
                      Don't have an account?{' '}
                      <Link to="/signup">Signup here</Link>
                    </div>
                  </Form.Group>
            </Row>
            </Form>
            </div>
        )}
      </Formik>
    </div>
  )
}
const styles = {
  container: {
    top:150,
    maxWidth: '500px',
    minWidth: '300px',
    maxHeight: '100vh',
   width: '30%',
    height: '60%',
    margin: '100px auto',
    borderRadius: '25px',
    width: '100%',
    padding: 20,
    overflow: 'auto',
    position: 'relative',
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
}
export default Signin
