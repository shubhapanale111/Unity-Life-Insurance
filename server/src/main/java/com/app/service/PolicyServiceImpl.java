package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.customerException.ResourceNotFoundException;
import com.app.dao.PolicyDao;
import com.app.dto.AddPolicyDto;
import com.app.dto.PolicyReturnDto;
import com.app.entities.Policy;

import lombok.extern.slf4j.Slf4j;
@Service
@Transactional
@Slf4j
public class PolicyServiceImpl implements PolicyService {
	@Autowired
	private PolicyDao polDao;
	@Autowired
	private ModelMapper mapper;
	@Value("${project.policyImages}")
	private String folder;
	@PostConstruct
	public void anyInit() {
		log.info("in init {} ", folder);
		
		File dir = new File(folder);
		if (!dir.exists())
			log.info("dir created {} ", dir.mkdirs());
		else
			log.info("dir alrdy exists.... ");
	}

	@Override
	public Policy addPolicy(AddPolicyDto apdto) {
	Policy policy =mapper.map(apdto, Policy.class);
	policy=polDao.save(policy);
	return policy;
}

	@Override
	public String uploadPolicyImage(long policyId,MultipartFile file) throws IOException {
		Policy policy=polDao.findById(policyId).orElseThrow(()->new ResourceNotFoundException("Policy Not Found With ID"+policyId));
		String imagePath = folder.concat("/PolicyId"+policyId+".jpg");
		log.info("bytes copied {} ",
				Files.copy(file.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
		policy.setPolicyImage(imagePath);
		return "Policy Image Uploaded SuccessFully";
	}

	@Override
	public byte[] getPolicyImageById(long policyId) throws IOException {
		Policy policy=polDao.findById(policyId).orElseThrow(()->new ResourceNotFoundException("Policy Not found with Id"+policyId));
	
		if(policy.getPolicyImage()==null)
         throw new ResourceNotFoundException("Policy doesnt have an Image");
		return Files.readAllBytes(Paths.get(policy.getPolicyImage()));
		
		 
	}

	@Override
	public PolicyReturnDto getPolicyDetails(long policyId) {
		
		return mapper.map(polDao.findById(policyId).orElseThrow(()->new ResourceNotFoundException("Policy Not found with Id"+policyId)), PolicyReturnDto.class);
	}

	@Override
	public List<PolicyReturnDto> getAllPolicyDetails() {
		List<Policy>allPolicies=polDao.findAll();
		List<PolicyReturnDto>retAllPolicies=allPolicies.stream().map((policy)->mapper.map(policy, PolicyReturnDto.class)).collect(Collectors.toList());
		return retAllPolicies;
	}



}
