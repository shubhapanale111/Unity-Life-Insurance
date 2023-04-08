package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.customerException.ResourceNotFoundException;
import com.app.customerException.UserNotFoundException;
import com.app.dao.AgentDao;
import com.app.dao.CustomerDao;
import com.app.dao.CustomerPolicyDao;
import com.app.dao.PolicyDao;
import com.app.dao.PolicyTransactionDao;
import com.app.dto.AgentDto;
import com.app.dto.CustomerDto;
import com.app.dto.CustomerPolicyDto;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.PolicyReturnDto;
import com.app.dto.PolicyTransactionsDto;
import com.app.dto.SigninDto;
import com.app.dto.SignupDto;
import com.app.entities.Address;
import com.app.entities.Agent;
import com.app.entities.Customer;
import com.app.entities.CustomerPolicy;
import com.app.entities.Policy;
import com.app.entities.PolicyTransactions;

import lombok.extern.slf4j.Slf4j;
@Service
@Transactional
@Slf4j
public class AgentServiceImpl implements AgentService {
	@Autowired
	private AgentDao agDao;
	@Autowired
	private CustomerDao custDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private CustomerPolicyDao custPolDao;
	@Autowired
	private PolicyDao polDao;
	@Value("${project.agentImages}")
	private String folder;
	@Value("${project.customerImages}")
	private String customerFolder;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private PolicyTransactionDao polTranDao;
	@PostConstruct
	public void anyInit() {
		log.info("in init {} ", folder);
		
		File dir = new File(folder);
		
		if (!dir.exists())
			log.info("dir created {} ", dir.mkdirs());
		else
			log.info("dir alrdy exists.... ");
	File dir2 = new File(customerFolder);
		
		if (!dir2.exists())
			log.info("dir created {} ", dir2.mkdirs());
		else
			log.info("dir alrdy exists.... ");
	}

	@Override
	public AgentDto addAgent(SignupDto signupDto) {
	    
		Agent agent=this.mapper.map(signupDto,Agent.class);
	agent.setAddress(new Address());
	   agent.setPassword(encoder.encode(signupDto.getPassword()));
		Agent retAgent=agDao.save(agent);
		
		return this.AgentToDto(retAgent);
	}

	@Override
	public AgentDto getAgentByEmailAndPassword(SigninDto signinDto) {
		
	return this.AgentToDto(agDao.findByEmailAndPassword(signinDto.getEmail(), signinDto.getPassword()).orElseThrow(()->new UserNotFoundException("Agents Email or Password is Invalid")));
	}

//	@Override
//	public AgentDto getAgentByEmailAndSecurityQuestionAndSecurityAnswer(ForgotPasswordDto fpDto) {
//
//		Agent agent=agDao.findByEmailAndSecurityQuestionAndSecurityAnswer(fpDto.getEmail(), fpDto.getSecurityQuestion(),fpDto.getSecurityAnswer()).orElseThrow(()->new UserNotFoundException("Agents Email or Password is Invalid"));
//		agent.setPassword(encoder.encode(fpDto.getPassword()));
//		agDao.save(agent);
//		return this.AgentToDto(agent);
//
//	}
	public Agent dtoToAgent(AgentDto agDto)
	{ 
		return mapper.map(agDto, Agent.class);
	}
	public AgentDto AgentToDto(Agent agent)
	{
		return mapper.map(agent, AgentDto.class);
	}



	@Override
	public AgentDto upDateProfile(AgentDto agDto,Address address) {
 Agent agentTemp=		agDao.findById(agDto.getId()).orElseThrow(()->new UserNotFoundException("Agent Not Found With ID  "+agDto.getId()));
   agDto.setPassword(agentTemp.getPassword());
//   agDto.setSecurityQuestion(agentTemp.getSecurityQuestion());
//   agDto.setSecurityAnswer(agentTemp.getSecurityQuestion());
   agDto.setAddress(address);
   agDto.setImage(agentTemp.getImage());
   agDto.setPanDoc(agentTemp.getPanDoc());
   agDto.setAadharDoc(agentTemp.getAadharDoc());
 //		String profileImagePath = folder.concat(File.separator).concat("AgentID "+agUpDto.getId());
//		Files.copy(profileImage.getInputStream(), Paths.get(profileImagePath), StandardCopyOption.REPLACE_EXISTING);
//		agUpDto.setImage(profileImagePath);
//		String aadharDocPath = folder.concat(File.separator).concat("AgentAadhar "+agUpDto.getId());
//		Files.copy(acDoc.getInputStream(), Paths.get(aadharDocPath), StandardCopyOption.REPLACE_EXISTING);
//		agUpDto.setAadharDoc(aadharDocPath);
//		String panDocPath = folder.concat(File.separator).concat("AgentPan  "+agUpDto.getId());
//		Files.copy(pcDoc.getInputStream(), Paths.get(panDocPath), StandardCopyOption.REPLACE_EXISTING);
//		agUpDto.setPanDoc(panDocPath);
	Agent	 agent=mapper.map(agDto, Agent.class);
		agDao.save(agent);
		
		return mapper.map(agent, AgentDto.class);
	}

	@Override
	public List<CustomerDto> getMyCustomers(long  agentId) {
	    Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent Not Found With Id  "+agentId));
		return custDao.findByAgent(agent).stream().map((customer)->mapper.map(customer, CustomerDto.class)).collect(Collectors.toList());
	}

	@Override
	public CustomerDto addMyCustomer( long agentId, CustomerDto custDto, Address address){
		Agent agent=agDao.findById(agentId).orElseThrow(()-> new UserNotFoundException("Agent Not Found Exception "+agentId));
		System.out.println(custDto.getAddress());
		Customer customer=custDao.save(mapper.map(custDto, Customer.class));
		customer.setAgent(agent);
		customer.setAddress(address);

		return mapper.map(customer, CustomerDto.class);
		//return custDto;
	}

	@Override
	public List<CustomerPolicyDto> getMyCustomersPolicies(long agentId,long customerId) {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent not found with Id "+agentId));
		Customer customer=custDao.findById(customerId).orElseThrow(()->new UserNotFoundException("Customer not found with Id "+customerId));
		return custPolDao.findByAgentAndCustomerAndClaimStatusAndSurrenderStatus(agent,customer,0,0).stream().map((customerPolicy)->mapper.map(customerPolicy, CustomerPolicyDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<CustomerPolicyDto> getMyCustomersPolicyPremiums(long agentId) {
		
		return custPolDao.getAgentsCustomersPremiums(agentId, LocalDate.now()).stream().map((customerPolicy)->mapper.map(customerPolicy, CustomerPolicyDto.class)).collect(Collectors.toList());
	}

	@Override
	public CustomerPolicyDto addMyCustomersPolicy(long agentId, long customerId, long policyId,
			CustomerPolicyDto customerPolicyDto) {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent not found with Id "+agentId));
		Customer customer=custDao.findById(customerId).orElseThrow(()->new UserNotFoundException("Customer not found with Id "+customerId));
		Policy policy=polDao.findById(policyId).orElseThrow(()->new ResourceNotFoundException("Policy not found with id "+policyId));
		CustomerPolicy customerPolicy=mapper.map(customerPolicyDto, CustomerPolicy.class);
		customerPolicy.setAgent(agent);
		customerPolicy.setCustomer(customer);
		customerPolicy.setPolicy(policy);
		custPolDao.save(customerPolicy);
		return mapper.map(customerPolicy, CustomerPolicyDto.class);
	}

	@Override
	public PolicyTransactionsDto fillCustomersPremium(long agentId, long customerId, long policyId,long customerPolicyId, double amount) {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent not found with Id "+agentId));
		Customer customer=custDao.findById(customerId).orElseThrow(()->new UserNotFoundException("Customer not found with Id "+customerId));
		Policy policy=polDao.findById(policyId).orElseThrow(()->new ResourceNotFoundException("Policy not found with id "+policyId));
	   PolicyTransactions policyTransactions=new PolicyTransactions();
	   policyTransactions.setAmount(amount);
	   policyTransactions.setAgent(agent);
	   policyTransactions.setCustomer(customer);
	   policyTransactions.setPolicy(policy);
	   policyTransactions.setPaymentDate(LocalDate.now());
	   CustomerPolicy customerPolicy=custPolDao.findById(customerPolicyId).orElseThrow(()->new ResourceNotFoundException("CustomersPolicy not found with id "+customerPolicyId));
//	  Calendar c=Calendar.getInstance();
//	  c.setTime(customerPolicy.getPremiumDate());
//	  c.add(Calendar.MONTH, 1);
	   customerPolicy.setPremiumDate(customerPolicy.getPremiumDate().plusMonths(1));
	   
		return mapper.map(polTranDao.save(policyTransactions), PolicyTransactionsDto.class);
	}

	@Override
	public List<CustomerPolicyDto> getAppiliedPolicies(long agentId) {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent not found with Id "+agentId));
		return custPolDao.findByAgentAndStatusAndClaimStatusAndSurrenderStatus(agent,false,0,0).stream().map((customerPolicy)->mapper.map(customerPolicy, CustomerPolicyDto.class)).collect(Collectors.toList());
	}

	@Override
	public List<PolicyReturnDto> getApplicablePoliciesForCustomer(long customerId) {
		custDao.findById(customerId).orElseThrow(()->new UserNotFoundException("Customer not found with Id "+customerId));
		return polDao.getApplicablePoliciesForCustomer(customerId).stream().map((policy)->mapper.map(policy, PolicyReturnDto.class)).collect(Collectors.toList());
	}

	@Override
	public CustomerPolicyDto changeClaimStatus(long customerPolicyId) {
	CustomerPolicy custPolicy=custPolDao.findById(customerPolicyId).orElseThrow(()->new ResourceNotFoundException("Customers Policy Not Found With ID"));
	custPolicy.setClaimStatus(1);

	
	custPolicy.setClaimDate(LocalDate.now());
	custPolicy=custPolDao.save(custPolicy);
	return mapper.map(custPolicy, CustomerPolicyDto.class);
	}

	@Override
	public CustomerPolicyDto changeSurrenderStatus(long customerPolicyId) {
		CustomerPolicy custPolicy=custPolDao.findById(customerPolicyId).orElseThrow(()->new ResourceNotFoundException("Customers Policy Not Found With ID"));
		custPolicy.setSurrenderStatus(1);
		
		
		custPolicy.setClaimDate(LocalDate.now());
		custPolicy=custPolDao.save(custPolicy);
		
		return mapper.map(custPolicy, CustomerPolicyDto.class);
	}

	@Override
	public List<CustomerPolicyDto> getPolicyHistoryByAgent(long agentId) {
	
		return custPolDao.getPolicyHistoyByAgent(agentId).stream().map((policy)->mapper.map(policy, CustomerPolicyDto.class)).collect(Collectors.toList());
	}

	@Override
	public AgentDto uploadProfileImage(long agentId, MultipartFile profileImage) throws IOException {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent Not Found With Id "+agentId));
		String imagePath = folder.concat(File.separator).concat("AgentId "+agentId);
		log.info("bytes copied {} ",
				Files.copy(profileImage.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
		agent.setImage(imagePath);
		return mapper.map(agent, AgentDto.class);
	}

	@Override
	public byte[] getProfileImage(@Valid long agentId) throws IOException {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent Not Found With Id "+agentId));
		if(agent.getImage()==null)
			  throw new ResourceNotFoundException("Admin doesnt have an ProfileImage");
					return Files.readAllBytes(Paths.get(agent.getImage()));
	}

	@Override
	public AgentDto uploadAadharDoc(long agentId, MultipartFile aadharDoc) throws IOException {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent Not Found With Id "+agentId));
		String imagePath = folder.concat(File.separator).concat("Aadhar "+agentId);
		log.info("bytes copied {} ",
				Files.copy(aadharDoc.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
		agent.setAadharDoc(imagePath);
		return mapper.map(agent, AgentDto.class);
	}

	@Override
	public AgentDto uploadPanDoc(long agentId, MultipartFile panDoc)  throws IOException {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent Not Found With Id "+agentId));
		String imagePath = folder.concat(File.separator).concat("Pan "+agentId);
		log.info("bytes copied {} ",
				Files.copy(panDoc.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
		agent.setPanDoc(imagePath);
		return mapper.map(agent, AgentDto.class);
	}

	@Override
	public byte[] getAadharDoc(@Valid long agentId) throws IOException {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent Not Found With Id "+agentId));
		if(agent.getAadharDoc()==null)
			  throw new ResourceNotFoundException("Agent doesnt have an Aadhar Doc");
					return Files.readAllBytes(Paths.get(agent.getAadharDoc()));
	}

	@Override
	public byte[] getPanDoc(@Valid long agentId) throws IOException {
		Agent agent=agDao.findById(agentId).orElseThrow(()->new UserNotFoundException("Agent Not Found With Id "+agentId));
		if(agent.getPanDoc()==null)
			  throw new ResourceNotFoundException("Agent doesnt have an Pan Doc");
					return Files.readAllBytes(Paths.get(agent.getPanDoc()));
	}
  
}
