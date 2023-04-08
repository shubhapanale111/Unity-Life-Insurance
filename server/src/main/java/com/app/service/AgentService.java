package com.app.service;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AgentDto;
import com.app.dto.AgentUpdateDto;
import com.app.dto.CustomerDto;
import com.app.dto.CustomerPolicyDto;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.PolicyReturnDto;
import com.app.dto.PolicyTransactionsDto;
import com.app.dto.SigninDto;
import com.app.dto.SignupDto;
import com.app.entities.Address;

public interface AgentService {
public AgentDto addAgent(SignupDto signupDto);
public AgentDto getAgentByEmailAndPassword(SigninDto signinDto);
//public AgentDto getAgentByEmailAndSecurityQuestionAndSecurityAnswer(ForgotPasswordDto fpDto);

public AgentDto upDateProfile(AgentDto agDto,Address address);
public List<CustomerDto> getMyCustomers(long agentId);
public CustomerDto addMyCustomer(@Valid long agentId, CustomerDto custDto,Address address);
public List<CustomerPolicyDto> getMyCustomersPolicies(long agentId,long customerId);
public List<CustomerPolicyDto> getMyCustomersPolicyPremiums(long agentId);
public CustomerPolicyDto addMyCustomersPolicy(long agentId, long customerId, long policyId, CustomerPolicyDto customerPolicy);
public PolicyTransactionsDto fillCustomersPremium(long agentId,long customerId,long policyId,long customerPolicyId,double amount);
public List<CustomerPolicyDto> getAppiliedPolicies(long agentId);
public List<PolicyReturnDto> getApplicablePoliciesForCustomer(long customerId);
public CustomerPolicyDto changeClaimStatus(long customerPolicyId);
public CustomerPolicyDto changeSurrenderStatus(long customerPolicyId);
public List<CustomerPolicyDto> getPolicyHistoryByAgent(long agentId);
public AgentDto uploadProfileImage(long agentId, MultipartFile profileImage) throws IOException;
public byte[] getProfileImage(@Valid long agentId) throws IOException;
public AgentDto uploadAadharDoc(long agentId, MultipartFile aadharDoc)  throws IOException;
public AgentDto uploadPanDoc(long agentId, MultipartFile panDoc)  throws IOException;
public byte[] getAadharDoc(@Valid long agentId)throws IOException;
public byte[] getPanDoc(@Valid long agentId)throws IOException;

}
