package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Policy;

public interface PolicyDao extends JpaRepository<Policy, Long> {
	@Query(value="select * from policy where id != ALL(select policy_id from customer_policy where customer_id=?1)" ,nativeQuery = true)
	List<Policy>getApplicablePoliciesForCustomer(long customerId);
}
