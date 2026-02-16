package com.bank.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.banking.model.User;
import com.bank.banking.model.Transaction;
import com.bank.banking.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService service;

    // Register
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    // Login
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return service.login(user.getEmail(), user.getPassword());
    }

    // Deposit
    @PostMapping("/deposit/{id}/{amount}")
    public User deposit(@PathVariable int id, @PathVariable double amount) {
        return service.deposit(id, amount);
    }

    // Withdraw
    @PostMapping("/withdraw/{id}/{amount}")
    public User withdraw(@PathVariable int id, @PathVariable double amount) {
        return service.withdraw(id, amount);
    }

    // Transaction history
    @GetMapping("/transactions/{id}")
    public List<Transaction> getTransactions(@PathVariable int id) {
        return service.getTransactions(id);
    }
}
