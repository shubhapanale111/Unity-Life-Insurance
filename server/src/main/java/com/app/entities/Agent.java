package com.app.entities;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Agent extends BaseEntity implements UserDetails {
	@Column(nullable = false)
	private String firstName;
	@Column(nullable = false)
	private String lastName;
	@Column(unique = true,nullable = false)
	private long phoneNumber;
	@Column(unique = true,nullable = false)
	private String email;
	@Column(nullable = false)
	private String password;

	private String image;
	
   private int age;
	private LocalDate dateOfBirth;
	private LocalDate hireDate;
	@Column(unique = true,length=12)
   private String aadhar;
	private String aadharDoc;
	@Column(unique = true,length=10)
	private String pan;
	private String panDoc;
	

	@Embedded
	private Address address;
//	@OneToMany(mappedBy = "agent",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
//	private List<Customer>customers=new ArrayList<>();
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> grantedAuthorities=new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority(Role.AGENT.name()));

		return grantedAuthorities;
		
	}
	@Override
	public String getUsername() {
		
		return email;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	
}
