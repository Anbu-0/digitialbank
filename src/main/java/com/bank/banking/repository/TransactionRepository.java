package com.bank.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.bank.banking.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    List<Transaction> findByUserId(int userId);
}
