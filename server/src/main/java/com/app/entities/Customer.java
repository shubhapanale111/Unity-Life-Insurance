package com.app.entities;



import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;



import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Customer extends BaseEntity {
	@Column(nullable = false)
private String firstName;
	@Column(nullable = false)
private String lastName;
@Column(unique = true,nullable = false)
private long phoneNumber;
@Column(unique = true,nullable = false)
private String email;

private String password;

private String image;


@ManyToOne
private Agent agent;


private int age;
private LocalDate dateOfBirth;
@Column(unique = true,length=12)
private String aadhar;
private String aadharDoc;
@Column(unique = true,length=10)
private String pan;
private String panDoc;


@Embedded
private Address address;

 
}
