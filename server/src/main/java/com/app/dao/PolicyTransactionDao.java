package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.PolicyTransactions;

public interface PolicyTransactionDao extends JpaRepository<PolicyTransactions, Long> {

}
