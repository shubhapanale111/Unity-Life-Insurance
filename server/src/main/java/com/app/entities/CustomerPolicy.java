package com.app.entities;


import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"customer_id","policy_id"}))
@Entity
@Getter
@Setter
@NoArgsConstructor
public class CustomerPolicy extends BaseEntity {
	@Column(nullable = false)
	private LocalDate policyStartDate;
	@Column(nullable = false)
	private LocalDate policyEndDate;
	@Column(nullable = false)
	private LocalDate premiumDate;
	@Column(nullable = false)
	private double premium;
	

	@Column(nullable = false)
	private boolean status;
	@Column(nullable = false)
	private double claimAmount;
	private LocalDate claimDate;
	@ManyToOne
	private Customer customer;
	@ManyToOne
	private Policy policy;
	@ManyToOne
	private Agent agent;
	private int  claimStatus;
	private int surrenderStatus;
	private double surrenderAmount;

}
