package com.app.controller;

import java.io.IOException;

import javax.validation.Valid;

import com.app.dto.ApiResponse;
import com.app.dto.SignupDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.app.service.CustomerService;

@RestController
@RequestMapping("/customer")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")
public class CustomerController {
@Autowired
private CustomerService cusServ;


@PostMapping("/signup")
public ResponseEntity<?>signup(@RequestBody @Valid SignupDto signupDto)
{
	try {
		
		return ResponseEntity.status(HttpStatus.CREATED).body(cusServ.addCustomer(signupDto));
	}
	catch(RuntimeException e) {
	
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage(),HttpStatus.CONFLICT));
	}
}

@PostMapping("/addProfileImage/{custId}")
public ResponseEntity<?> addProfileImage(@PathVariable long custId, @RequestParam MultipartFile profileImage)
		throws IOException {
	
	return ResponseEntity.status(HttpStatus.CREATED).body(cusServ.uploadProfileImage(custId, profileImage));
}
@GetMapping(value = "/getProfileImage/{custId}",produces = 
{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
public ResponseEntity<?> getProfileImage(@PathVariable  @Valid long custId) throws IOException
{

return ResponseEntity.ok(cusServ.getProfileImage(custId));
}
@PostMapping("/addAadharDoc/{custId}")
public ResponseEntity<?> addAadharDoc(@PathVariable long custId, @RequestParam MultipartFile aadharDoc)
		throws IOException {
	
	return ResponseEntity.status(HttpStatus.CREATED).body(cusServ.uploadAadharDoc(custId, aadharDoc));
}
@PostMapping("/addPanDoc/{custId}")
public ResponseEntity<?> addPanDoc(@PathVariable long custId, @RequestParam MultipartFile panDoc)
		throws IOException {
	
	return ResponseEntity.status(HttpStatus.CREATED).body(cusServ.uploadPanDoc(custId, panDoc));
}
@GetMapping(value = "/getAadharDoc/{custId}",produces = 
{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
public ResponseEntity<?> getAadharDoc(@PathVariable  @Valid long custId) throws IOException
{

return ResponseEntity.ok(cusServ.getAadharDoc(custId));
}
@GetMapping(value = "/getPanDoc/{custId}",produces = 
{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
public ResponseEntity<?> getPanDoc(@PathVariable  @Valid long custId) throws IOException
{

return ResponseEntity.ok(cusServ.getPanDoc(custId));
}
}
