import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button,Col,Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate()
  const signinpage = () => {
    navigate('/signin')
  }
  const signuppage = () => {
    navigate('/signup')
  }
  return (
    <div style={{overflowY:'auto'}}>
    <Navbar bg="#004E8F"  style={styles.navs} variant={"dark"} expand="lg">
    
    
    <Navbar.Brand>
      <img
        src={require(`../Images/logo-color.png`)}
        className="logo"
        style={styles.logo}
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <NavLink to="/" style={styles.myfont}>Home</NavLink>
          <NavLink to="/contactus" style={styles.myfont}>Contact Us</NavLink>
         
          <NavLink to="/aboutus" style={styles.myfont}>About Us</NavLink>
        </Nav>
        
        <Button variant="outline-success rounded-pill" style={{
                width: "100px",
                height: 45,
                backgroundColor: "voilet",
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
                margin:"10px",
          }} onClick={signinpage}>SignIn</Button>


           <Button variant="outline-success rounded-pill" style={{
                width: "100px",
                height: 45,
                backgroundColor: "yellow",
                color: "black",
                fontWeight: "bold",
                fontSize: 18,
                margin:"10px",
          }} onClick={signuppage}>SignUp</Button>

      </Navbar.Collapse>
    
    </Navbar>
    </div>
  )
}
export default NavBar;
const styles = {
    navs: {
      color: "white",
      fontWeight: "bold",
      fontSize: 22,
      backgroundColor:"#3c008f",
      marginBottom:'5px',
      
    },
    myfont:{
      marginRight:'10px',
      color:"white",
      textDecoration: 'none',
    },
    signindropdown:{
      textDecoration:'none',color:'black',
    },
    logo:{
      width:"150px",
        height:"80px",
        margin:'none',
       borderRadius:'10px'

    }
  };