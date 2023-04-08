package com.app.controller;
import javax.annotation.security.PermitAll;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AdminDto;
import com.app.dto.AgentDto;
import com.app.dto.SigninDto;
import com.app.entities.Role;
import com.app.spring_security.UserDetailsService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")@PermitAll
@Slf4j
public class UserController {

	 @Autowired
	 private UserDetailsService userService;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private com.app.jwt.JwtUtils utils;

	@Autowired	
	private AuthenticationManager manager;


	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid SigninDto request) {
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token before {}", authToken);
		try {
			
			Authentication authenticatedDetails = manager.authenticate(authToken);
			log.info("auth token again {} ", authenticatedDetails);
			
			String token = utils.generateJwtToken(authenticatedDetails);
			UserDetails user=userService.loadUserByUsername(request.getEmail());
			System.out.println(user.getAuthorities());
			if(user.getAuthorities().contains(new SimpleGrantedAuthority(Role.AGENT.name()))) {
				System.out.println("Agent==>"+user);
				AgentDto agentDTO=mapper.map(user, AgentDto.class);
				agentDTO.setToken(token);
				return ResponseEntity.ok(agentDTO);
			}else {
				System.out.println("Admin==>"+user);
				AdminDto adminDto=mapper.map(user,AdminDto.class);
				adminDto.setToken(token);
				return ResponseEntity.ok(adminDto);
			}
		} catch (BadCredentialsException e) {
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}

	}
}