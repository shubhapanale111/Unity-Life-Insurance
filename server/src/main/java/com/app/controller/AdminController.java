package com.app.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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

import com.app.dto.AddPolicyDto;
import com.app.dto.AdminDto;
import com.app.dto.AdminUpdateDto;
import com.app.dto.AgentDto;
import com.app.dto.ApiResponse;
import com.app.dto.CustomerDto;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.PolicyReturnDto;
import com.app.entities.Address;
import com.app.service.AdminService;
import com.app.service.PolicyService;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
@Autowired
private AdminService adServ;
@Autowired
private PolicyService polServ;
@PostMapping("/addPolicy")
public ResponseEntity<?>addPolicy(@RequestBody @Valid AddPolicyDto apDto)
{
	try {
		return ResponseEntity.status(HttpStatus.CREATED).body(polServ.addPolicy(apDto));
	}
	catch(RuntimeException e) {
	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(),HttpStatus.BAD_REQUEST));
	}
}
@PostMapping("/addPolicyImage/{policyId}")
public ResponseEntity<?> addPolicyImage(@PathVariable long policyId, @RequestParam MultipartFile imageFile)
		throws IOException {
	System.out.println("****************hiii***************");
	System.out.println("in upload image " + policyId + " orig file name " + imageFile.getOriginalFilename() + " size "
			+ imageFile.getSize());
	return ResponseEntity.status(HttpStatus.CREATED).body(polServ.uploadPolicyImage(policyId, imageFile));
}
@GetMapping(value = "/getPolicyImage/{policyId}",produces = 
{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
public ResponseEntity<?> getPolicyDetails(@PathVariable long policyId) throws IOException
{

return ResponseEntity.ok(polServ.getPolicyImageById(policyId));
}
@GetMapping(value="/getPolicy/{policyId}")
public ResponseEntity<PolicyReturnDto> getPolicy(@PathVariable long policyId) 
{

return ResponseEntity.ok(polServ.getPolicyDetails(policyId));
}
@GetMapping(value="/getAllPolicies")
public ResponseEntity<List<PolicyReturnDto>> getAllPolicies() 
{

return ResponseEntity.ok(polServ.getAllPolicyDetails());
}
@GetMapping(value="/getAllAgents")
public ResponseEntity<List<AgentDto>> getAllAgents() 
{

return ResponseEntity.ok(adServ.getAllAgents());
}
@GetMapping(value="/getAllCustomers")
public ResponseEntity<List<CustomerDto>> getAllCustomers() 
{

return ResponseEntity.ok(adServ.getAllCustomers());
}
@PutMapping(value="/updateAdmin")
public ResponseEntity<?>upDateProfile(@ModelAttribute  AdminDto adDto,@ModelAttribute Address address) 
{
	
	return ResponseEntity.ok().body(adServ.updateAdmin( adDto,address));
	
}
@PostMapping("/addProfileImage/{adminId}")
public ResponseEntity<?> addProfileImage(@PathVariable long adminId, @RequestParam MultipartFile profileImage)
		throws IOException {
	
	return ResponseEntity.status(HttpStatus.CREATED).body(adServ.uploadProfileImage(adminId, profileImage));
}
@GetMapping(value = "/getProfileImage/{adminId}",produces = 
{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
public ResponseEntity<?> getProfileImage(@PathVariable  @Valid long adminId) throws IOException
{

return ResponseEntity.ok(adServ.getProfileImage(adminId));
}
@GetMapping(value="/getMyCustomerPolicies/customer/{customerId}")
public ResponseEntity<?>getMyCustomersPolicies(@PathVariable long customerId)
{
	return ResponseEntity.ok(adServ.getMyCustomerPolicies(customerId));
}
@GetMapping(value="/getNewAppilcations")
public ResponseEntity<?>getNewApplications()
{
	return ResponseEntity.ok(adServ.getNewAppicatons());
}
@PutMapping(value="/acceptPolicy/{customerPolicyId}")
public ResponseEntity<?>acceptPolicy(@PathVariable long customerPolicyId)
{
	return ResponseEntity.ok(adServ.acceptPolicy(customerPolicyId));
}
@DeleteMapping(value="/rejectPolicy/{customerPolicyId}")
public ResponseEntity<?>rejectPolicy( @PathVariable long customerPolicyId)
{
	return ResponseEntity.ok(adServ.rejectPolicy(customerPolicyId));
}
@GetMapping(value="/getNewClaims")
public ResponseEntity<?>getNewClaims()
{
	return ResponseEntity.ok(adServ.getNewClaims());
}
@PutMapping(value="/acceptClaim/{customerPolicyId}")
public ResponseEntity<?>acceptClaim(@PathVariable long customerPolicyId)
{
	return ResponseEntity.ok(adServ.acceptClaim(customerPolicyId));
}
@PutMapping(value="/rejectClaim/{customerPolicyId}")
public ResponseEntity<?>rejectClaim( @PathVariable long customerPolicyId)
{
	return ResponseEntity.ok(adServ.rejectClaim(customerPolicyId));
}
@GetMapping(value="/getNewSurrenders")
public ResponseEntity<?>getNewSurrenders()
{
	return ResponseEntity.ok(adServ.getNewSurrenders());
}
@PutMapping(value="/acceptSurrender/{customerPolicyId}")
public ResponseEntity<?>acceptSurrender(@PathVariable long customerPolicyId,@RequestParam int surrenderAmount )
{System.out.println("Surreder Amount==>"+surrenderAmount);
	return ResponseEntity.ok(adServ.acceptSurrender(customerPolicyId,surrenderAmount));
}
@PutMapping(value="/rejectSurrender/{customerPolicyId}")
public ResponseEntity<?>rejectSurrender( @PathVariable long customerPolicyId,@RequestParam int surrenderAmount )
{
	return ResponseEntity.ok(adServ.rejectSurrender(customerPolicyId,surrenderAmount));
}
}
