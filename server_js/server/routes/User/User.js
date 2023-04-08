
const { response } = require('express');
const express=require('express');
const router=express.Router();
const db=require('../../db');
const utils = require('../../utils');
const config = require('../../config')
const jwt = require('jsonwebtoken')
const cryptoJs = require('crypto-js')

router.post('/signin',(request,response)=>{
    console.log("sign in req recieved..");
    const { email, password } = request.body;
    const encryptedPassword = String(cryptoJs.MD5(password))
    const statement=`select * from customer where email=? and password=?`
    db.Pool.query(statement, [email, encryptedPassword], (error, users) => {
        const result = {}
        if (error) {
            result['status'] = 'error'
            result['error']=error
        } else if (users.length === 0) {
            result['status'] = 'error'
            result['error']='Customer Not found'
        } else {
            const payload = { id: users[0].id }
            const user=users[0]
            const token = jwt.sign(payload, config.secret)
            result['status'] = 'success'
            let role="CUSTOMER"
            result['data'] = {
                token,
                role,
                user,
            }
        }
        response.send(result)
    })
})
router.post('/signup',(request,response)=>{
    console.log("signup requested...")
    const { firstName, lastName, phoneNumber, email, securityQuestion, securityAnswer, password } = request.body;
    const encryptedPassword = String(cryptoJs.MD5(password))
    const age = 0;
    const city = "Not yet added"
    const pincode = 000000
    const state = "Not yed added";
    const village ="Not yet added"
    const statement = `insert into customer(first_name,last_name,phone_number,email,security_question,security_answer,password,age,city,pincode,state ,village ,date_of_birth) values(?,?,?,?,?,?,?,?,?,?,?,?,Date(now()))`;
    db.Pool.query(statement,[firstName,lastName,phoneNumber,email, securityQuestion,securityAnswer,encryptedPassword,age,city,pincode,state,village],(error,data)=>{
      response.send(utils.createResult(error,data));
    })
})
router.post('/forgotPassword',(request,response)=>{
    const { email, security_question, security_answer, password } = request.body;
    const encryptedPassword=String(cryptoJs.MD5(password))
    const statement = `update customer set password=? where email=? and security_question=? and security_answer=?`;
    db.Pool.query(statement,[encryptedPassword,email, security_question, security_answer],(error,data)=>{
        response.send(utils.createResult(error,data));
    })
})
module.exports=router;
