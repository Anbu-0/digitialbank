package com.bank.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bank.banking.model.Transaction;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByUserId(int userId);
}
