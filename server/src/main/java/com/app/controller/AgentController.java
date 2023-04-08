package com.app.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AgentDto;
import com.app.dto.AgentUpdateDto;
import com.app.dto.ApiResponse;
import com.app.dto.CustomerDto;
import com.app.dto.CustomerPolicyDto;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.PolicyReturnDto;
import com.app.dto.SignupDto;
import com.app.entities.Address;
import com.app.service.AgentService;
import com.app.service.PolicyService;


@RestController
@RequestMapping("/agent")
@CrossOrigin(origins = "http://localhost:3000")
public class AgentController {
@Autowired
private AgentService agServ;
@Autowired
private PolicyService polServ;
@PostMapping("/signup")
public ResponseEntity<?>signup(@RequestBody @Valid SignupDto signupDto)
{
	try {
		
		return ResponseEntity.status(HttpStatus.CREATED).body(agServ.addAgent(signupDto));
	}
	catch(RuntimeException e) {
	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(),HttpStatus.CONFLICT));
	}
}

//@PostMapping("/forgotPassword")
//public ResponseEntity<?>forgotPassword(@RequestBody @Valid ForgotPasswordDto fpDto){
//
//
//		return ResponseEntity.status(HttpStatus.OK).body(agServ.getAgentByEmailAndSecurityQuestionAndSecurityAnswer(fpDto));
//
//}
@PutMapping("/updateAgent")
public ResponseEntity<?>updateProfile(@ModelAttribute AgentDto agDto,@ModelAttribute Address address) 
{ System.out.println(agDto);
//Address address=agDto.getAddress();
System.out.println(address);
	return ResponseEntity.status(HttpStatus.OK).body(agServ.upDateProfile(agDto,address));
}
@GetMapping(value="/getAllPolicies")
public ResponseEntity<List<PolicyReturnDto>> getAllPolicies() 
{

return ResponseEntity.ok(polServ.getAllPolicyDetails());
}
@GetMapping(value="/getMyCustomers/{agentId}")
public ResponseEntity<List<CustomerDto>>getMyCustomers(@PathVariable long agentId){
	return ResponseEntity.ok().body(agServ.getMyCustomers(agentId));
	
}
@PostMapping(value="/addMyCustomer/{agentId}")
public ResponseEntity<?>addMyCustomer(@PathVariable @Valid long agentId,@ModelAttribute CustomerDto custDto,@ModelAttribute Address address) throws IOException
{//{System.out.println(custDto);
//System.out.println(address);
//System.out.println(profileImage!=null);,@RequestBody MultipartFile profileImage, @RequestBody MultipartFile acDoc,@RequestBody MultipartFile pcDoc
//System.out.println(acDoc!=null);
//System.out.println(pcDoc!=null);
	return ResponseEntity.ok().body(agServ.addMyCustomer(agentId,custDto,address));
}
@GetMapping(value="/getMyCustomersPremiums/{agentId}")
public ResponseEntity<?>getMyCustomersPremiums(@PathVariable long agentId)
{ System.out.println("in getMyCustomersPremiums");
	return ResponseEntity.ok().body(agServ.getMyCustomersPolicyPremiums(agentId));
}
@GetMapping(value="/getMyCustomerPolicies/{agentId}/customer/{customerId}")
public ResponseEntity<?>getMyCustomersPolicies(@PathVariable long agentId,@PathVariable long customerId)
{
	return ResponseEntity.ok().body(agServ.getMyCustomersPolicies(agentId,customerId));
}
@PostMapping("/addMyCustomersPolicy/agent/{agentId}/customer/{customerId}/policy/{policyId}")
public ResponseEntity<?>addMyCustomersPolicy(@PathVariable long agentId,@PathVariable long customerId,@PathVariable long policyId,@RequestBody CustomerPolicyDto customerPolicyDto)

{
	return ResponseEntity.ok().body(agServ.addMyCustomersPolicy(agentId,customerId,policyId,customerPolicyDto));
}
@PostMapping(value="/addMyCustomersDocument/{agentId}/customer/{customerId}")
public ResponseEntity<?>addMyCustomersDocumnets(@RequestParam("profileImage") MultipartFile profileImage, @RequestParam("acDoc") MultipartFile acDoc,@RequestParam("pcDoc") MultipartFile pcDoc){
	System.out.println(profileImage.getSize());
	
	System.out.println(profileImage.isEmpty());
	System.out.println(acDoc.getSize());
	System.out.println(pcDoc.getOriginalFilename());
	return ResponseEntity.ok().body("Parameters Recieved");
}
@PostMapping(value="/payMyCustomersPremium")
public ResponseEntity<?>payMyCustomersPremium(@RequestParam long agentId, @RequestParam long customerId,@RequestParam long policyId,@RequestParam long customerPolicyId,@RequestParam double amount){
	System.out.println(agentId+" "+customerId+""+policyId+""+customerPolicyId+""+amount);
	return ResponseEntity.ok().body(agServ.fillCustomersPremium(agentId, customerId, policyId, customerPolicyId, amount));
}
@GetMapping(value="/getAppliedPolicies/{agentId}")
public ResponseEntity<?>getAppiliedPolicies(@PathVariable long agentId){
	return ResponseEntity.ok().body(agServ.getAppiliedPolicies(agentId));
}
@GetMapping(value="/getApplicablePoliciesForCustomer/{customerId}")
public ResponseEntity<?>getApplicablePoliciesForCustomer(@PathVariable long customerId){
	return ResponseEntity.ok().body(agServ.getApplicablePoliciesForCustomer(customerId));
}
@PutMapping(value="/applyForClaim/{customerPolicyId}")
public ResponseEntity<?>applyForClaim(@PathVariable long customerPolicyId){
	return ResponseEntity.ok().body(agServ.changeClaimStatus(customerPolicyId));
}
@PutMapping(value="/applyForSurrender/{customerPolicyId}")
public ResponseEntity<?>applyForSurrender(@PathVariable long customerPolicyId){
	return ResponseEntity.ok().body(agServ.changeSurrenderStatus(customerPolicyId));
}
@GetMapping(value="/getMyCustomorsPolicyHistory/{agentId}")
public ResponseEntity<?>getMyCustomorsPolicyHistory(@PathVariable long agentId){
	return ResponseEntity.ok().body(agServ.getPolicyHistoryByAgent(agentId));
}
@PostMapping("/addProfileImage/{agentId}")
public ResponseEntity<?> addProfileImage(@PathVariable long agentId, @RequestParam MultipartFile profileImage)
		throws IOException {
	
	return ResponseEntity.status(HttpStatus.CREATED).body(agServ.uploadProfileImage(agentId, profileImage));
}
@GetMapping(value = "/getProfileImage/{agentId}",produces = 
{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
public ResponseEntity<?> getProfileImage(@PathVariable  @Valid long agentId) throws IOException
{

return ResponseEntity.ok(agServ.getProfileImage(agentId));
}
@PostMapping("/addAadharDoc/{agentId}")
public ResponseEntity<?> addAadharDoc(@PathVariable long agentId, @RequestParam MultipartFile aadharDoc)
		throws IOException {
	
	return ResponseEntity.status(HttpStatus.CREATED).body(agServ.uploadAadharDoc(agentId, aadharDoc));
}
@PostMapping("/addPanDoc/{agentId}")
public ResponseEntity<?> addPanDoc(@PathVariable long agentId, @RequestParam MultipartFile panDoc)
		throws IOException {
	
	return ResponseEntity.status(HttpStatus.CREATED).body(agServ.uploadPanDoc(agentId, panDoc));
}
@GetMapping(value = "/getAadharDoc/{agentId}",produces = 
{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
public ResponseEntity<?> getAadharDoc(@PathVariable  @Valid long agentId) throws IOException
{

return ResponseEntity.ok(agServ.getAadharDoc(agentId));
}
@GetMapping(value = "/getPanDoc/{agentId}",produces = 
{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
public ResponseEntity<?> getPanDoc(@PathVariable  @Valid long agentId) throws IOException
{

return ResponseEntity.ok(agServ.getPanDoc(agentId));
}
}
