package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Agent;

public interface AgentDao extends JpaRepository<Agent, Long> {
   Optional<Agent> findByEmailAndPassword(String email,String password);

   Agent findByEmail(String email);
}
