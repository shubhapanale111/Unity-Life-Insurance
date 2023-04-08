const validation = (values) => {
    let errors = {}
    if(!values.firstName){
        errors.firstName="*First Name cannot be Empty"
    }
    if(!values.lastName){
        errors.lastName="*Last Name cannot be Empty"
    }
    if(!values.email){
        errors.email="*Email cannot be Empty"
    } else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="*Email is Invalid"
    }
    if(!values.mobileNumber){
        errors.mobileNumber="*Mobile Number cannot be Empty"
    } else if (values.mobileNumber.length < 10) {
        errors.mobileNumber="*Invalid Mobile Number"
    }
    if(!values.password){
        errors.password="*Password cannot be Empty"
    }else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{8,32}$/.test(values.password))
    {
        errors.password="*Password must contain [A-Z],[a-z],[0-9],[@#\$%\^&\*]"
        }
    if(!values.confirmPassword){
        errors.confirmPassword="*Confirm Password cannot be Empty"
    } else if (values.password != values.confirmPassword)
    {
        errors.confirmPassword="*Password did not match"
        }

    if (!values.signinpassword) {
        errors.signinpassword="*Password cannot be Empty"
    }
    if (!values.signinemail) {
        errors.signinemail="*Email cannot be Empty"
    }
    return errors
}
export default validation