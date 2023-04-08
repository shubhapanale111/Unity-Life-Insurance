package com.app.dto;



import java.time.LocalDate;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
public class AgentDto {

private long id;

private String firstName;

private String lastName;

private long phoneNumber;

private String email;

private String password;
private String token;
private String image;

@DateTimeFormat(pattern = "yyyy-MM-dd")
@Temporal(TemporalType.DATE)
private LocalDate dateOfBirth;
private LocalDate hireDate;

private String aadhar;
private  String aadharDoc;

private String pan;
private String panDoc;
private String Role="AGENT";
private Address address;



}
