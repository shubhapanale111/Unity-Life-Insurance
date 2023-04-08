package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.app.entities.Address;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class AdminUpdateDto {
	@NotNull
	private long id;
	@NotBlank
	private String firstName;
	@NotBlank
	private String lastName;
	private long phoneNumber;
	@Email(message="Email Address not Valid")
	private String email;
  @Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", message = "Blank or invalid password")
	private String password;

	private Address address;
	private String image;

}
