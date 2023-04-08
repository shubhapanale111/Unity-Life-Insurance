package com.app.dto;



import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class CustomerPolicyDto {
	private long id;

	private LocalDate policyStartDate;
	
	private LocalDate policyEndDate;

	private LocalDate premiumDate;

	private int Premium;



	private boolean status;

	private float claimAmount;

	private LocalDate claimDate;
	

	private CustomerDto customer;

	private PolicyReturnDto policy;

	private AgentDto agent;
	private int  claimStatus;
	private int surrenderStatus;
	private double surrenderAmount;
}
