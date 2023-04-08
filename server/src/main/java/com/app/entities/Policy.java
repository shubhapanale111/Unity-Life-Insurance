package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Policy extends BaseEntity {
@Column(nullable = false,unique = true)
private String policyName;
@Column(nullable = false)
private int minEntryAge;
@Column(nullable = false)
private int maxEntryAge;
@Column(nullable = false)
private int minPeriodMonths;
@Column(nullable = false)
private int maxPeriodMonths;
@Column(nullable = false)
private int minMonthPremium;
@Column(nullable = false)
private int maxMonthPremium;

//private String policyDoc;
@Column(nullable = false)
private double agentCommisionPercentage;
@Column(nullable = false)
private double perAnnumRate;
@Column(length = 1000)
private String policyDescription;
 
private  String policyImage;

}
