package com.bank.banking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bank.banking.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
