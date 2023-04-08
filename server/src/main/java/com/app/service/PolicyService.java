package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AddPolicyDto;
import com.app.dto.PolicyReturnDto;
import com.app.entities.Policy;

public interface PolicyService {
Policy addPolicy(AddPolicyDto apdto);
String uploadPolicyImage(long policyId,MultipartFile file) throws IOException;
byte[] getPolicyImageById(long policyId) throws IOException;
PolicyReturnDto getPolicyDetails(long policyId);
List<PolicyReturnDto>getAllPolicyDetails();

}
