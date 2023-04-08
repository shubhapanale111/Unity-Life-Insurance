package com.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
@NoArgsConstructor
public class AddPolicyDto {
   @NotBlank
	private String policyName;
	@NotNull
	private int minEntryAge;
	@NotNull
	private int maxEntryAge;
	@NotNull
	private int minPeriodMonths;
	@NotNull
	private int maxPeriodMonths;
	@NotNull
	private int minMonthPremium;
	@NotNull
	private int maxMonthPremium;

	private String policyDoc;
	@NotNull
	private double agentCommisionPercentage;
	@NotNull
	private double perAnnumRate;
	private String policyDescription;

}
