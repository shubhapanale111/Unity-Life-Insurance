package com.app.spring_security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.dao.AdminDao;
import com.app.dao.AgentDao;
import com.app.entities.Admin;
import com.app.entities.Agent;
@Service
public class UserDetailsService   implements org.springframework.security.core.userdetails.UserDetailsService{
	@Autowired
	private AdminDao adminDao;
	@Autowired 
	private AgentDao agentDao;
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Agent agent = agentDao.findByEmail(email);
	
		if(agent==null) {
			Admin admin = adminDao.findByEmail(email);
			if(admin!=null) {
	
				return admin;
			}
			else
			{
				throw new UsernameNotFoundException("Invalid Credentials");
			}
		}
		
		return agent;
	}
}