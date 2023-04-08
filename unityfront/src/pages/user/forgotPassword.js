// import { Col,Form,InputGroup,Row,Container,Button } from "react-bootstrap"
// import { Formik } from "formik";
// import Navbar from "../../components/navbar";
// import * as yup from "yup";
// import '../../App.css'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// import config from './../config';
// const schema = yup.object().shape({
//   email: yup.string().required("Please Enter email address").matches(/\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Invalid email ID"),
//   password: yup.string()
//   .required("Please Enter your Password")
//   .max(25)
//   .matches(/^(?=.{8,})/, "Must Contain 8 Characters")
//   .matches(
//     /^((?=.*[a-z]){1})((?=.*[A-Z]){1})/,
//     "Must Contain One Uppercase, One Lowercase"
//   )
//   .matches(
//     /(\W)/,
//     "Must Contain One Special Case Character"
//   )
//   .matches(/(?=.*\d)/, "Must Contain One Number"),
//   confirmPassword: yup.string().required("Please confirm your Password").oneOf([yup.ref("password"), null], "Passwords must match"),
//   securityAnswer: yup.string().required("Please Enter your Security Answer"),
// });

// function ForgotPassword() {
//   const Navigate=useNavigate();
//   return (
//     <div className="App">
//        <Navbar />
//     <Formik
//       validationSchema={schema}
//       onSubmit={(values) => {
//         let email = values.email

//         let password = values.password
//         let role = values.role
//         let securityQuestion=values.securityQuestion;
//         let securityAnswer=values.securityAnswer;
//         console.log(role);
//         let url="";
//         if(role==="CUSTOMER")
//        url=`${config.ExpressUrl}/customer/forgotPassword`;
//         else if(role==="AGENT")
//         url=`${config.SpingUrl}/agent/forgotPassword`;
//         else
//         url=`${config.SpingUrl}/admin/forgotPassword`;
//         console.log(url);
//           axios
//             .post(url, {
//               email,
//               password,
//               securityQuestion,
//               securityAnswer
//             })
//             .then((response) => {
//               const result = response.data

//               if (response.status === 200) {
//                 toast.success('WELCOME TO SVRP INSURANCE')
//                 alert("Password Changed Successfully...")
//                 Navigate('/signin')
//               } else {
//                 toast.error('Please enter valid email or password.... ')
//                 alert("Password Change Failed")
//               }
//             })
//             .catch((error) => {
//               console.log(error)
//               alert("Password Change Incatch")
//             })
        
//       }}
//       initialValues={{
//     email: "",
//     password: "",
//     confirmPassword: "",
//     securityQuestion:"In what city were you born?",
//         securityAnswer: "",
//       }}
//     >
//       {({
//         handleSubmit,
//         handleChange,
//         handleBlur,
//         values,
//         touched,
//         isValid,
//         errors,
//       }) => (
//         <div>
//           <Container style={styles.container}>
//             <Form noValidate onSubmit={handleSubmit} style={styles.myfont} >
//               <Row className="mb-2">
//               <Form.Group as={Col} md="12" controlId="validationFormik02">
//                     <Form.Label>Role</Form.Label>
//                     <InputGroup hasValidation>
//                       <Form.Select
                        
//                         name="role"
//                         onChange={handleChange}
//                         value={values.role}
//                       >
//                         <option>Choose a Role</option>
//                         <option value="ADMIN">ADMIN</option>
//                         <option value="AGENT">AGENT</option>
//                         <option value="CUSTOMER">CUSTOMER</option>
//                       </Form.Select>
//                     </InputGroup>
//                   </Form.Group>

//                 <Form.Group as={Col} md="12" controlId="validationFormik04">
//                   <Form.Label>Email ID</Form.Label>
//                   <Form.Control
//                     type="email"
//                       name="email"
//                       placeholder="Enter your Mail ID here"
//                     value={values.email}
//                     onChange={handleChange}
//                     isValid={touched.email && !errors.email}
//                     isInvalid={!!errors.email}
//                   />
//                  <Form.Control.Feedback className="FeedBack" type="invalid">{errors.email}</Form.Control.Feedback>
//                 </Form.Group>
//                 </Row>
//                 <Row className="mb-2">
//                 <Form.Group
//                   as={Col}
//                   md="12"
//                   controlId="validationFormik02">
//                   <Form.Label>Security Question</Form.Label>
//                   <InputGroup hasValidation
//                  >
                    
//                     <Form.Select aria-label="Default select example"
//                      name="securityQuestion"
//                      onChange={handleChange}
//                      value={values.securityQuestion}>
//                       <option >Choose a Question</option>
//       <option value="In what city were you born?" >In what city were you born?</option>
//       <option value="What was your favorite food as a child ?">What was your favorite food as a child ?</option>
//     <option value="What is the name of your first school ?">What is the name of your first school ?</option>
//     <option value="What is the name of your favourite pet ?">What is the name of your favourite pet ?</option>
//     <option value="What is the name of your Favourite movie ?">What is the name of your Favourite movie ?</option>
//     </Form.Select>
//                   </InputGroup>
//                 </Form.Group>
//               </Row>
//               <Row>
//               <Form.Group as={Col} md="12" controlId="validationFormik07">
//                   <Form.Label>Security Answer</Form.Label>
//                   <Form.Control
//                     type="text"
//                       name="securityAnswer"
//                       placeholder="Enter your Security Answer here"
//                     value={values.securityAnswer}
//                     onChange={handleChange}
//                     isValid={touched.securityAnswer && !errors.securityAnswer}
//                     isInvalid={!!errors.securityAnswer}
//                   />
//                   <Form.Control.Feedback className="FeedBack" type="invalid">{errors.securityAnswer}</Form.Control.Feedback>
//                 </Form.Group>
//               </Row>
//               <Row className="mb-2">
//                 <Form.Group as={Col} md="6" controlId="validationFormik05">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     className="SignUpFormControls"
//                       type="password"
//                       placeholder="Enter your Password here"
//                     name="password"
//                     value={values.password}
//                     onChange={handleChange}
//                   isValid={touched.password && !errors.password}
//                     isInvalid={!!errors.password}
//                   />
//                    <Form.Control.Feedback className="FeedBack" type="invalid">
//                     {errors.password}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group as={Col} md="6" controlId="validationFormik06">
//                   <Form.Label>Confirm Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                       name="confirmPassword"
//                       placeholder="Confirm your Password here"
//                     value={values.confirmPassword}
//                     onChange={handleChange}
//                     isValid={touched.confirmPassword && !errors.confirmPassword}
//                     isInvalid={!!errors.confirmPassword} 
//                   />
//                   <Form.Control.Feedback className="FeedBack" type="invalid">
//           {errors.confirmPassword}
//         </Form.Control.Feedback>
//                 </Form.Group>
//               </Row>
//               <Row>
//               <Form.Group as={Col} md="12" className="mb-2" controlId="validationFormik08">
//               <Button
//                 type="submit"
//                 variant="outline-secondary"
//                 style={styles.signinButton}
//               >
//                 Reset-Password
//                     </Button>
//                   </Form.Group>
//                 </Row>
//             </Form>
//           </Container>
//         </div>
//       )}
//       </Formik>
//       </div>
//   );
// }
// const styles = {
//   container: {
//     top:180,
//     maxWidth: '500px',
//     minWidth: '300px',
//     maxHeight: '700px',
//    width: '30%',
//     height: '60%',
//     margin: '100px auto',
//     borderRadius: '25px',
//     width: '100%',
//     padding: 20,
//     overflow: 'auto',
//     position: 'relative',
//     margin: 'auto',
//    borderColor: 'white',
//   // borderRadius: 10,
//    broderWidth: 1,
//    borderStyle: 'solid',
//    boxShadow: '1px 1px 20px 5px white',
//   background: "rgba(0,0, 0, 0.5)",
//   },
//   signinButton: {
//     position: "relative",
//     width: "100%",
//     height: 40,
//     backgroundColor: "#FFCB08",
//     color: "black",
//     borderRadius: 5,
//     border: "none",
//     marginTop: 10,
//     fontWeight: "bold",
//   },
//   myfont: {
//     marginRight: "10px",
//     color: "white",
//     textDecoration: "none",
//     fontWeight: "bold",
//   },
// };
// export default ForgotPassword;
