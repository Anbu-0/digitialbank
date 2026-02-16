package com.bank.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import com.bank.banking.model.User;
import com.bank.banking.model.Transaction;
import com.bank.banking.service.UserService;
import com.bank.banking.security.JwtUtil;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {

        User loggedUser = service.login(user.getEmail(), user.getPassword());

        if (loggedUser != null) {

            String token = jwtUtil.generateToken(loggedUser.getEmail());

            return Map.of(
                    "token", token,
                    "id", loggedUser.getId(),
                    "name", loggedUser.getName(),
                    "accountNumber", loggedUser.getAccountNumber(),
                    "balance", loggedUser.getBalance()
            );
        }

        return Map.of("error", "Invalid Credentials");
    }

    @PostMapping("/deposit/{id}/{amount}")
    public User deposit(@PathVariable int id, @PathVariable double amount) {
        return service.deposit(id, amount);
    }

    @PostMapping("/withdraw/{id}/{amount}")
    public User withdraw(@PathVariable int id, @PathVariable double amount) {
        return service.withdraw(id, amount);
    }

    @PostMapping("/transfer/{id}")
    public User transfer(
            @PathVariable int id,
            @RequestParam String accountNumber,
            @RequestParam double amount) {

        return service.transfer(id, accountNumber, amount);
    }

    @GetMapping("/transactions/{id}")
    public List<Transaction> getTransactions(@PathVariable int id) {
        return service.getTransactions(id);
    }
}
