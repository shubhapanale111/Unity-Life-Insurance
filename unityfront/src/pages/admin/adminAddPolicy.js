import AdminSideBar from "./adminsidebar";
import AdminNavBar from "./adminnavbar";
import "./Dashboard.css";
import { Col, Form, InputGroup, Row, Container, Button } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import "../../App.css";
import config from './../config';

const schema = yup.object().shape({
  policyName: yup.string().required("Please enter Policy Name"),
  minEntryAge: yup.string().required("Please enter Min Entry Age"),
  maxEntryAge: yup.string().required("Please enter Max Entry Age"),
  minPeriodMonths: yup.string().required("Please enter Minimun Period Months"),
  maxPeriodMonths: yup.string().required("Please enter Maximum Period Months"),
  minMonthPremium: yup.string().required("Please enter Minumum Month preminum"),
  maxMonthPremium: yup.string().required("Please enter Maximum Month preminum"),
  perAnnumRate: yup.string().required("Please enter Per Annum Rate"),
  agentCommisionPercentage: yup
    .string()
    .required("Please enter agent Commission Percentage"),
  policyDescription: yup.string().required("Please enter Pocicy Description"),
 
});

const AdminAddPolicy = () => {
  const location = useLocation()
  let admin=location.state.admin
  const navigate = useNavigate();
  const [policyDetails, setpolicyDetails] = useState();
  const [token, setToken] = useState(sessionStorage.getItem("token_ADMIN"));
  useEffect(() => {
    if (!sessionStorage["token_ADMIN"]) {
      navigate("/signin");
    }
  }, []);

  return (
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
              let policyName = values.policyName;
              let minEntryAge = values.minEntryAge;
              let maxEntryAge = values.maxEntryAge;
              let minPeriodMonths = values.minPeriodMonths;
              let maxPeriodMonths = values.maxPeriodMonths;
              let minMonthPremium = values.minMonthPremium;
              let maxMonthPremium = values.maxMonthPremium;
              let policyDescription = values.policyDescription;
              
              let agentCommisionPercentage = values.agentCommisionPercentage;
              let perAnnumRate = values.perAnnumRate;
              console.log(policyName);
              const url = `${config.SpingUrl}/admin/addPolicy`;
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + token;
              axios
                .post(url, {
                  policyName,
                  minEntryAge,
                  maxEntryAge,
                  minPeriodMonths,
                  maxPeriodMonths,
                  minMonthPremium,
                  maxMonthPremium,
                  policyDescription,
                 
                  agentCommisionPercentage,
                  perAnnumRate,
                })
                .then((response) => {
                  setpolicyDetails(response.data);
                  toast.success("Policy added Successfully");
                  navigate("/adminallplans",{state:{admin:admin}})
                })
                .catch((error) => {
                  toast.error("Data Not Found" + error);
                });
            }}
            initialValues={{
              policyName: "",
              minEntryAge: "",
              maxEntryAge: "",
              minPeriodMonths: "",
              maxPeriodMonths: "",
              minMonthPremium: "",
              maxMonthPremium: "",
              policyDescription: "",
              
              agentCommisionPercentage: "",
              perAnnumRate: "",
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
              <div className="dashboard d-flex">
                <Container style={styles.container}>
                  <h1
                    style={{
                      marginBottom: "40px",
                      marginLeft: "10px",
                      textAlign: "center",
                    }}
                  >
                    <b>New Policy</b>
                  </h1>
                  <Form
                    noValidate
                    onSubmit={handleSubmit}
                    style={styles.myfont}
                  >
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Policy Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="policyName"
                          placeholder="Enter Policy Name"
                          value={values.policyName}
                          onChange={handleChange}
                          isValid={touched.policyName && !errors.policyName}
                          isInvalid={!!errors.policyName}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.policyName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Policy Description</Form.Label>
                        <Form.Control
                          type="text"
                          name="policyDescription"
                          value={values.policyDescription}
                          onChange={handleChange}
                          placeholder="Add Policy Description"
                          isValid={
                            touched.policyDescription &&
                            !errors.policyDescription
                          }
                          isInvalid={!!errors.policyDescription}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.policyDescription}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Minimun Entry Age</Form.Label>
                        <Form.Control
                          type="number"
                          name="minEntryAge"
                          value={values.minEntryAge}
                          onChange={handleChange}
                          placeholder="Enter Min Entry Age"
                          isValid={touched.minEntryAge && !errors.minEntryAge}
                          isInvalid={!!errors.minEntryAge}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.minEntryAge}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Maximum Entry Age</Form.Label>
                        <Form.Control
                          type="number"
                          name="maxEntryAge"
                          placeholder="Enter Maximum Entry Age"
                          value={values.maxEntryAge}
                          onChange={handleChange}
                          isValid={touched.maxEntryAge && !errors.maxEntryAge}
                          isInvalid={!!errors.maxEntryAge}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.maxEntryAge}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Minumun Period of Months</Form.Label>
                        <Form.Control
                          type="number"
                          name="minPeriodMonths"
                          value={values.minPeriodMonths}
                          onChange={handleChange}
                          placeholder="Enter Min Period of Months"
                          isValid={
                            touched.minPeriodMonths && !errors.minPeriodMonths
                          }
                          isInvalid={!!errors.minPeriodMonths}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.minPeriodMonths}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Maximun Period of Months</Form.Label>
                        <Form.Control
                          type="number"
                          name="maxPeriodMonths"
                          value={values.maxPeriodMonths}
                          onChange={handleChange}
                          placeholder="Enter Max Period of Months"
                          isValid={
                            touched.maxPeriodMonths && !errors.maxPeriodMonths
                          }
                          isInvalid={!!errors.maxPeriodMonths}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.maxPeriodMonths}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Minimun Month Premium</Form.Label>
                        <Form.Control
                          type="number"
                          name="minMonthPremium"
                          value={values.minMonthPremium}
                          onChange={handleChange}
                          placeholder="Enter Min Month of Premium"
                          isValid={
                            touched.minMonthPremium && !errors.minMonthPremium
                          }
                          isInvalid={!!errors.minMonthPremium}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.minMonthPremium}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Maximun Month Premium</Form.Label>
                        <Form.Control
                          type="number"
                          name="maxMonthPremium"
                          value={values.maxMonthPremium}
                          onChange={handleChange}
                          placeholder="Enter Max Month Premium"
                          isValid={
                            touched.maxMonthPremium && !errors.maxMonthPremium
                          }
                          isInvalid={!!errors.maxMonthPremium}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.maxMonthPremium}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Agent Commission Percentage</Form.Label>
                        <Form.Control
                          type="number"
                          name="agentCommisionPercentage"
                          value={values.agentCommisionPercentage}
                          onChange={handleChange}
                          placeholder="Enter Agent Commission Percentage"
                          isValid={
                            touched.agentCommisionPercentage &&
                            !errors.agentCommisionPercentage
                          }
                          isInvalid={!!errors.agentCommisionPercentage}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.agentCommisionPercentage}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationFormik07"
                      >
                        <Form.Label>Per Annum Rate</Form.Label>
                        <Form.Control
                          type="number"
                          name="perAnnumRate"
                          value={values.perAnnumRate}
                          onChange={handleChange}
                          placeholder="Enter Per Annume Rate"
                          isValid={touched.perAnnumRate && !errors.perAnnumRate}
                          isInvalid={!!errors.perAnnumRate}
                        />
                        <Form.Control.Feedback
                          className="FeedBack"
                          type="invalid"
                        >
                          {errors.perAnnumRate}
                        </Form.Control.Feedback>
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
                          Save Policy
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
export default AdminAddPolicy;
const styles = {
  container: {
    width: 800,
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
