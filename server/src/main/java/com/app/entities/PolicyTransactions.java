package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString

public class PolicyTransactions extends BaseEntity {
@ManyToOne
private Policy policy;
@ManyToOne
private Customer customer;
@ManyToOne
private Agent agent;
private double amount;
@DateTimeFormat(pattern = "yyyy-MM-dd")
private LocalDate paymentDate;

}
