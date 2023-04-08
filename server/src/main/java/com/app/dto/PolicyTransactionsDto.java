package com.app.dto;



import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
@NoArgsConstructor
public class PolicyTransactionsDto {

	private PolicyReturnDto policy;

	private CustomerDto customer;

	private AgentDto agent;
	private double amount;
	private LocalDate paymentDate;
}
