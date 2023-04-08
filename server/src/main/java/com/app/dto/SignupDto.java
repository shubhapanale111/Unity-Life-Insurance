package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class SignupDto {
	@NotBlank
	private String firstName;
	@NotBlank
	private String lastName;
	//@Pattern(regexp="(^$|[0-9]{10})",message = "Phone Number Must be of 10 digits")
	private long phoneNumber;
	@Email(message="Email Address not Valid")
	private String email;

	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Blank or invalid password")
	private String password;

}
