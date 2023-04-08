package com.app.spring_security;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.jwt.JWTRequestFilter;

@EnableWebSecurity 
@Configuration // to enable adding @Bean annotated methods
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	
	@Autowired
	private JWTRequestFilter filter;

	@Bean
	public SecurityFilterChain configureAuthorization(HttpSecurity http) throws Exception{
		http.cors().and().csrf().disable()
		.exceptionHandling()
		.authenticationEntryPoint((request, response, ex) -> {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
		}).and()
		.authorizeRequests()
		.antMatchers("/user/signin").permitAll()
		.antMatchers("/agent/signup").permitAll()
		.antMatchers("/admin/signup").permitAll()
		.antMatchers("/admin/getPolicyImage/{policyId}").permitAll()
		.antMatchers("/admin/getProfileImage/{adminId}").permitAll()
		.antMatchers("/agent/getProfileImage/{agentId}").permitAll()
		.antMatchers("/admin/forgotPassword").permitAll()
		.antMatchers("/customer/getProfileImage/{custId}").permitAll()
		.antMatchers("/customer/getPanDoc/{custId}").permitAll()
		.antMatchers("/customer/getAadharDoc/{custId}").permitAll()
		.antMatchers("/agent/getPanDoc/{agentId}").permitAll()
		.antMatchers("/agent/getAadharDoc/{agentId}").permitAll()
		.antMatchers("/customer/addProfileImage/{custId}").permitAll()
		.antMatchers("/customer/addAadharDoc/{custId}").permitAll()
		.antMatchers("/customer/addPanDoc/{custId}").permitAll()
		.antMatchers(HttpMethod.OPTIONS).permitAll()
		.anyRequest().authenticated().and().
		sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS).
		and()
		.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);		
		return http.build();
	}
	

		@Bean
		public AuthenticationManager authenticatonMgr(AuthenticationConfiguration config) throws Exception {
			return config.getAuthenticationManager();
		}

}
