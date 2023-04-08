import CustomerSideBar from "./customersidebar";
import CustomerNavBar from "./customernavbar";
import "./Dashboard.css";
import { Col, InputGroup, Row, Container, Button,} from "react-bootstrap";
import { Formik,Field,Form, ErrorMessage } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../../App.css";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "./../config";
// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
// const FILE_SIZE = 1024 * 1024;

const schema = yup.object().shape({
    profileImage:yup.mixed()
    .nullable()
    .required("Profile Image is required!!"),
    // .test("FILE_SIZE", "Uploaded file is too big.", 
    //     value => !value || (value && value.size <= FILE_SIZE))
    // .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
    //     value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
    acDoc:yup.mixed()
    .nullable()
    .required("Aadhar Document is required!!"),
    pcDoc:yup.mixed()
    .nullable()
    .required("Pan Document is required!!")
  
});

const CustomerUploadDocuments = () => {
  let location = useLocation()
  let customer = location.state.customer
  console.log(customer)
const[ProfileImage,setProfileImage]=useState()
  const Navigate = useNavigate()
  const uploadImage = (proImage) => {
    const profileImage = new FormData()
    profileImage.set('image', proImage)
    axios
    .post(config.ExpressUrl + '/customer/uploadProfilePhoto/' + customer.id, profileImage, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: sessionStorage['token_CUSTOMER'],
      },
    })
    .then((response) => {
      const result = response.data
      if (result['status'] === 200) {
        toast.success('successfully uploaded a Profile Photo')
      } else {
        toast.error('error while uploading file')
      }
    })
  }
  useEffect(() => {
    if(!sessionStorage['token_CUSTOMER']){
     Navigate('/signin')
    }
  }, []);
  return (
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
              const profileImage = values.profileImage
              console.log(profileImage)
            }
            }
            initialValues={{
             profileImage:"",
             acDoc:"",
             pcDoc:"",
             
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
                <h1>Add Customer Details:</h1>
                <Container style={styles.container}>
                      <Form
                         noValidate
                         onSubmit={handleSubmit}
                    style={styles.myfont} >
                    <table>
                      <tr>
                        <td>
                        <label>Add Profile Image</label>
                        <input 
                        type="file"
                            className='form-control'
                            onSubmit={(event) => setProfileImage(event.target.files[0])}
                       />
                       <ErrorMessage name="profileImage"/>
                        </td>
                        <td>
                        <Button
                            type="submit"
                            onClick={uploadImage(ProfileImage)}
                          variant="outline-secondary"
                          style={styles.signinButton}
                        >
                          Upload Profile Image
                        </Button>
                        </td>
                      </tr>
                      <tr>
                      <td>
                        <label>Add Pan Card</label>
                        <input 
                        type="file"
                        className='form-control'
                       onChange={(event)=>setFieldValue("profileImage",event.target.files[0])}/>
                       <ErrorMessage name="profileImage"/>
                        </td>
                        <td>
                        <Button
                          type="submit"
                          variant="outline-secondary"
                          style={styles.signinButton}
                        >
                          Upload Pan Card
                        </Button>
                        </td>
                      </tr>
                      <tr>
                      <td>
                        <label>Add Adhar Card</label>
                        <input 
                        type="file"
                        className='form-control'
                       onChange={(event)=>setFieldValue("profileImage",event.target.files[0])}/>
                       <ErrorMessage name="profileImage"/>
                        </td>
                        <td>
                        <Button
                          type="submit"
                          variant="outline-secondary"
                          style={styles.signinButton}
                        >
                          Upload Aadhar Card
                        </Button>
                        </td>
                      </tr>
                      </table>
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
export default CustomerUploadDocuments;
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
