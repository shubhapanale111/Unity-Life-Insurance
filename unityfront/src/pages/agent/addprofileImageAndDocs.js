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

const AddProfileImageAndDocs = () => {
  let location = useLocation()
  
  let agent = location.state.agent
  let customer=location.state.customer
  const Navigate = useNavigate()
  const [token, setToken] = useState(sessionStorage.getItem('token_AGENT'))
 
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
 
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
            console.log(values);
             let profileImage=new FormData();
             profileImage.set('profileImage',values.profileImage)
             let acDoc=new FormData();
             acDoc.set('profileImage',values.profileImage)
             let pcDoc=new FormData();
             pcDoc.set('profileImage',values.profileImage)
             pcDoc.set('acDoc',values.acDoc)   
             
             
            
              axios
              .post(`${config.SpingUrl}/agent/addMyCustomersDocument/${agent.id}/customer/${customer.id}`, {},{
                params:{
                  
                 profileImage:profileImage,
                 acDoc:acDoc,
                 pcDoc:pcDoc,
              
                },headers:{
                    'Content-Type': 'multipart/form-data',
                }
                
              }).then((response)=>{
                let customer=null;
                if(response.status==200)
               { toast.success("Customer Added SuccessFully")
                  // customer=response.data;
                  console.log(response.data)
                //console.log("customer==>>"+customer.id);
               
              }
              else
              {
                toast.error("Failed to add docs")
              }
              
              }).catch((error)=>{
                toast.error("Failed to Add Customer docs"+error)
              })
              
            }}
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
                        <label>Add Profile Image</label>
                        <input 
                        type="file"
                        className='form-control'
                       onChange={(event)=>setFieldValue("profileImage",event.target.files[0])}/>
                       <ErrorMessage name="profileImage"/>
                       <br/>
                       <label>Add Aadhar Document</label>
                        <input className='form-control'
                        type="file"
                       onChange={(event)=>setFieldValue("acDoc",event.target.files[0])}/>
                       <ErrorMessage name="acDoc"/>
                       <br/>
                       <label>Add PanCard Document</label>
                        <input 
                        type="file"
                        className='form-control'
                       onChange={(event)=>setFieldValue("pcDoc",event.target.files[0])}/>
                       <ErrorMessage name="pcDoc"/>
                       <br/>
                        <Button
                          type="submit"
                          variant="outline-secondary"
                          style={styles.signinButton}
                        >
                          Upload Documents
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
export default AddProfileImageAndDocs;
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
