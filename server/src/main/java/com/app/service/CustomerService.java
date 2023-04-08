package com.app.service;

import java.io.IOException;

import javax.validation.Valid;

import com.app.entities.Customer;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AgentDto;
import com.app.dto.CustomerDto;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.SigninDto;
import com.app.dto.SignupDto;


public interface CustomerService {

	public CustomerDto addCustomer(SignupDto signupDto);
public CustomerDto uploadProfileImage(long custId, MultipartFile profileImage) throws IOException;
public byte[] getProfileImage(@Valid long custId) throws IOException;
public CustomerDto uploadAadharDoc(long custId, MultipartFile aadharDoc)  throws IOException;
public CustomerDto uploadPanDoc(long custId, MultipartFile panDoc)  throws IOException;
public byte[] getAadharDoc(@Valid long custId)throws IOException;
public byte[] getPanDoc(@Valid long custId)throws IOException;



}
