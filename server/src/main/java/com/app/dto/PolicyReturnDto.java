package com.app.dto;

//import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PolicyReturnDto {
	private long id;

	private String policyName;

	private int minEntryAge;

	private int maxEntryAge;

	private int minPeriodMonths;

	private int maxPeriodMonths;

	private int minMonthPremium;

	private int maxMonthPremium;

	private double agentCommisionPercentage;

	private double perAnnumRate;
	private  String policyImage;
	private String policyDescription;

}
