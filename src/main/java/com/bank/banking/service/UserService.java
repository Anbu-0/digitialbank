package com.bank.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.banking.model.User;
import com.bank.banking.model.Transaction;
import com.bank.banking.repository.UserRepository;
import com.bank.banking.repository.TransactionRepository;

import java.util.List;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    // Register
    public User register(User user) {
        user.setBalance(0);
     // Generate random 10-digit account number
        String accNumber = String.valueOf(1000000000L + new Random().nextLong(9000000000L));
        user.setAccountNumber(accNumber);
        
        return userRepo.save(user);
    }

    // Login
    public User login(String email, String password) {
        User user = userRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    // Deposit
    public User deposit(int userId, double amount) {
        User user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            user.setBalance(user.getBalance() + amount);
            userRepo.save(user);

            Transaction t = new Transaction(userId, "DEPOSIT", amount);
            transactionRepo.save(t);
        }
        return user;
    }
    

    // Withdraw
    public User withdraw(int userId, double amount) {
        User user = userRepo.findById(userId).orElse(null);
        if (user != null && user.getBalance() >= amount) {
            user.setBalance(user.getBalance() - amount);
            userRepo.save(user);

            Transaction t = new Transaction(userId, "WITHDRAW", amount);
            transactionRepo.save(t);
        }
        return user;
    }

    // Get transactions
    public List<Transaction> getTransactions(int userId) {
        return transactionRepo.findByUserId(userId);
    }
}
