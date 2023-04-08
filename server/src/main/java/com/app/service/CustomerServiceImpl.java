package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import javax.validation.Valid;

import com.app.dto.AgentDto;
import com.app.dto.SignupDto;
import com.app.entities.Address;
import com.app.entities.Agent;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.customerException.ResourceNotFoundException;
import com.app.customerException.UserNotFoundException;
import com.app.dao.CustomerDao;
import com.app.dto.CustomerDto;
import com.app.entities.Customer;

import lombok.extern.slf4j.Slf4j;
@Service
@Transactional
@Slf4j
public class CustomerServiceImpl implements CustomerService {
	@Autowired
	private CustomerDao cusDao;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private ModelMapper mapper;
	@Value("${project.customerImages}")
	private String folder;
	@PostConstruct
	public void anyInit() {
		log.info("in init {} ", folder);
		
		File dir = new File(folder);
		
		if (!dir.exists())
			log.info("dir created {} ", dir.mkdirs());
		else
			log.info("dir alrdy exists.... ");
	
	}
	public CustomerDto CustomerToDto(Customer customer)
	{
		return mapper.map(customer, CustomerDto.class);
	}


	@Override
	public CustomerDto addCustomer(SignupDto signupDto) {
	
		Customer customer=this.mapper.map(signupDto,Customer.class);
		customer.setAddress(new Address());
		customer.setPassword(encoder.encode(signupDto.getPassword()));
			Customer retCustomer=cusDao.save(customer);
			
			return this.CustomerToDto(retCustomer);
			
			
	}



@Override
public CustomerDto uploadProfileImage(long custId, MultipartFile profileImage) throws IOException {
	Customer Customer=cusDao.findById(custId).orElseThrow(()->new UserNotFoundException("Customer Not Found With Id "+custId));
	String imagePath = folder.concat(File.separator).concat("custId "+custId);
	log.info("bytes copied {} ",
			Files.copy(profileImage.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
	Customer.setImage(imagePath);
	return mapper.map(Customer, CustomerDto.class);
}

@Override
public byte[] getProfileImage(@Valid long custId) throws IOException {
	Customer Customer=cusDao.findById(custId).orElseThrow(()->new UserNotFoundException("Customer Not Found With Id "+custId));
	if(Customer.getImage()==null)
		  throw new ResourceNotFoundException("Admin doesnt have an ProfileImage");
				return Files.readAllBytes(Paths.get(Customer.getImage()));
}

@Override
public CustomerDto uploadAadharDoc(long custId, MultipartFile aadharDoc) throws IOException {
	Customer Customer=cusDao.findById(custId).orElseThrow(()->new UserNotFoundException("Customer Not Found With Id "+custId));
	String imagePath = folder.concat(File.separator).concat("Aadhar "+custId);
	log.info("bytes copied {} ",
			Files.copy(aadharDoc.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
	Customer.setAadharDoc(imagePath);
	return mapper.map(Customer, CustomerDto.class);
}

@Override
public CustomerDto uploadPanDoc(long custId, MultipartFile panDoc)  throws IOException {
	Customer Customer=cusDao.findById(custId).orElseThrow(()->new UserNotFoundException("Customer Not Found With Id "+custId));
	String imagePath = folder.concat(File.separator).concat("Pan "+custId);
	log.info("bytes copied {} ",
			Files.copy(panDoc.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
	Customer.setPanDoc(imagePath);
	return mapper.map(Customer, CustomerDto.class);
}


@Override
public byte[] getAadharDoc(@Valid long custId) throws IOException {
	Customer Customer=cusDao.findById(custId).orElseThrow(()->new UserNotFoundException("Customer Not Found With Id "+custId));
	if(Customer.getAadharDoc()==null)
		  throw new ResourceNotFoundException("Customer doesnt have an Aadhar Doc");
				return Files.readAllBytes(Paths.get(Customer.getAadharDoc()));
}

@Override
public byte[] getPanDoc(@Valid long custId) throws IOException {
	Customer Customer=cusDao.findById(custId).orElseThrow(()->new UserNotFoundException("Customer Not Found With Id "+custId));
	if(Customer.getPanDoc()==null)
		  throw new ResourceNotFoundException("Customer doesnt have an Pan Doc");
				return Files.readAllBytes(Paths.get(Customer.getPanDoc()));
}







}
