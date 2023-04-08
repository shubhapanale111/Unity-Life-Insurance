import Navbar from '../../components/navbar'
import '../../App.css'


const AboutUs = () => {
    return <div className='App'>
        <Navbar />
        <div style={styles.container}>
         <div className="section" >
		<div className="container">
			<div className="content-section">
				<div className="title">
                            <h1 style={styles.myfont1}>About Us</h1>
                            <br></br>
				</div>
				<div className='text-container' style={styles.myfont}>
				<h1>About Us Page</h1>
                <h2>Address: CDAC ACTS PATNA</h2>
                <p>Life insurance in India made its debut well over 100 years ago.

In our country, which is one of the most populated in the world, the prominence of insurance is not as widely understood, as it ought to be. What follows is an attempt to acquaint readers with some of the concepts of life insurance, with special reference to LIC.  

It should, however, be clearly understood that the following content is by no means an exhaustive description of the terms and conditions of an LIC policy or its benefits or privileges.

For more details, please contact our branch or divisional office. Any LIC Agent will be glad to help you choose the life insurance plan to meet your needs and render policy servicing.</p>
					<div className="button">
                    
					</div>
				</div>
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
export default AboutUs