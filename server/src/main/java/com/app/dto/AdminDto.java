package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.app.entities.Address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminDto {

	private long id;

	private String firstName;

	private String lastName;
	private long phoneNumber;
	
	private String email;
 
	private String password;

   private String token;
   private String Role="ADMIN";


	private Address address;
	private String image;
}
