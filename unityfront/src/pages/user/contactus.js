import Navbar from '../../components/navbar'
import '../../App.css'
const ContactUs = () => {
    return <div className='App'>
        <Navbar />
        <div style={styles.container}>
         <div className="section" >
		<div className="container">
			<div className="content-section">
				<div className="title">
                            <h1 style={styles.myfont1}>Contact Us</h1>
                            <br></br>
				</div>
				<div className='text-container' style={styles.myfont}>
				<h1>Contact Us Page</h1>
                <h2>Address: CDAC ACTS PATNA</h2>
                <h2>Mr. Shubham Panale-20980720105</h2>
                <h2>Mr. Bhagyesh Chaudhari-20980720025</h2>
                <h2>Mr. Dipak Chaudhari-20980720033</h2>
                <h2>Mr. Vijay Patil-20980720111</h2>
                <h2>Mr. Harshal Nikam-20980720066</h2>
                <h2>Mr. Shubham Sapkale-20980720106</h2>
					<div className="button">
					</div>
				</div>
				<div className="social">
					<a href=""><i className="fab fa-facebook-f"></i></a>
					<a href=""><i className="fab fa-twitter"></i></a>
					<a href=""><i className="fab fa-instagram"></i></a>
				</div>
			</div>
			<div className="image-section">
			</div>
		</div>
	</div>
        </div>
        </div>
}
const styles = {
    container: {
        top:180,
        maxWidth: '500px',
    minWidth: '300px',
    maxHeight: '700px',
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
   boxShadow: '1px 1px 20px 5px white',
  background: "rgba(0,0, 0, 0.5)",
    },
    myfont:{
        marginRight:'10px',
        color:"white",
        textDecoration: 'none',
       
    },
    myfont1:{
        marginRight:'10px',
        color:"#FFCB08",
        textDecoration: 'none',
        fontWeight:'bold'
      }
}
export default ContactUs