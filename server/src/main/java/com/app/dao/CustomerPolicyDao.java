package com.app.dao;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.CustomerPolicyDto;
import com.app.entities.Agent;
import com.app.entities.Customer;
import com.app.entities.CustomerPolicy;

public interface CustomerPolicyDao  extends JpaRepository<CustomerPolicy, Long>{
   @Query(value="select * from customer_policy cp where cp.agent_id=?1 and cp.premium_date<=?2 and cp.status=true and cp.claim_status=0 and cp.surrender_status=0",nativeQuery =true)
 List<CustomerPolicy>getAgentsCustomersPremiums(long agent_id,LocalDate d);
  List<CustomerPolicy>findByAgentAndCustomerAndClaimStatusAndSurrenderStatus(Agent agent,Customer customer,int claimStatus,int surrenderStatus);
  List<CustomerPolicy>findByAgentAndStatusAndClaimStatusAndSurrenderStatus(Agent agent,boolean status,int claimStatus,int surrenderStatus);
 @Query(value="select * from customer_policy where (claim_status>0 or surrender_status>0) and agent_id=?1",nativeQuery = true)
  List<CustomerPolicy> getPolicyHistoyByAgent(long agentId);
List<CustomerPolicy> findByCustomerAndStatusAndClaimStatusAndSurrenderStatus(Customer customer,boolean status,int claimStatus,int surrenderStatus);
List<CustomerPolicy> findByStatus(boolean  status);
List<CustomerPolicy> findByClaimStatus(int claimStatus);
List<CustomerPolicy> findBySurrenderStatus(int surrenderStatus);
}
