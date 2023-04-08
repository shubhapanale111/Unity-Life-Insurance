package com.app.dto;



import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.app.entities.Address;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AgentUpdateDto {
	@NotNull
	private long id;
@NotBlank
	private String firstName;
@NotBlank
	private String lastName;
//@NotBlank
	private long phoneNumber;
@NotBlank
	private String email;
@NotBlank
	private String password;
	private String image;
	

   private int age;
	private LocalDate dateOfBirth;
	private LocalDate hireDate;
	@NotBlank
   private String aadhar;
	private String aadharDoc;
	@NotBlank
	private String pan;
	private String panDoc;
	private Address address;
}
