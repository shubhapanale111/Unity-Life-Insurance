package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AdminDto;
import com.app.dto.AgentDto;
import com.app.dto.CustomerDto;
import com.app.dto.CustomerPolicyDto;
import com.app.dto.ForgotPasswordDto;
import com.app.dto.SigninDto;
import com.app.entities.Address;
public interface AdminService {
AdminDto getAdminByEmailAndPassword(SigninDto signinDto);
List<CustomerDto>getAllCustomers();
List<AgentDto>getAllAgents();
AdminDto updateAdmin( AdminDto adminDto,Address address);
byte[] getProfileImage(long adminId)throws IOException;
List<CustomerPolicyDto> getMyCustomerPolicies(long customerId);
List<CustomerPolicyDto>  getNewAppicatons();
CustomerPolicyDto acceptPolicy(long customerPolicyId);
CustomerPolicyDto rejectPolicy(long customerPolicyId);
List<CustomerPolicyDto> getNewClaims();
List<CustomerPolicyDto>  getNewSurrenders();
CustomerPolicyDto acceptClaim(long customerPolicyId);
CustomerPolicyDto rejectClaim(long customerPolicyId);
CustomerPolicyDto acceptSurrender(long customerPolicyId, double surrenderAmount);
CustomerPolicyDto rejectSurrender(long customerPolicyId, double surrenderAmount);
AdminDto uploadProfileImage(long adminId, MultipartFile profileImage) throws IOException;

}
