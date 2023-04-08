package com.app.dto;



import java.time.LocalDate;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

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
public class CustomerDto {
	private long id;
@NotBlank
private String firstName;
@NotBlank
private String lastName;
//@Length(min=10,max = 10)
private long phoneNumber;
@Email
private String email;
private String password;

private String image;
private AgentDto agent;
private int age;
@DateTimeFormat(pattern = "yyyy-MM-dd")
@Temporal(TemporalType.DATE)
private LocalDate dateOfBirth;
@Length(min=12,max=12)
private String aadhar;
private String aadharDoc;
@Length(min=10,max=10)
private String pan;
private String panDoc;
private Address address;


}
