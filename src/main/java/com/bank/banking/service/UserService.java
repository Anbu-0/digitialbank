package com.bank.banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

import com.bank.banking.model.User;
import com.bank.banking.model.Transaction;
import com.bank.banking.repository.UserRepository;
import com.bank.banking.repository.TransactionRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    public User register(User user) {

        user.setBalance(0);

        String accNumber = String.valueOf(1000000000L + new Random().nextLong(9000000000L));
        user.setAccountNumber(accNumber);

        return userRepo.save(user);
    }

    public User login(String email, String password) {

        User user = userRepo.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            return user;
        }

        return null;
    }

    public User deposit(int id, double amount) {

        User user = userRepo.findById(id).orElseThrow();

        user.setBalance(user.getBalance() + amount);
        userRepo.save(user);

        transactionRepo.save(new Transaction(id, "DEPOSIT", amount));

        return user;
    }

    public User withdraw(int id, double amount) {

        User user = userRepo.findById(id).orElseThrow();

        if (user.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        user.setBalance(user.getBalance() - amount);
        userRepo.save(user);

        transactionRepo.save(new Transaction(id, "WITHDRAW", amount));

        return user;
    }

    public User transfer(int senderId, String receiverAccount, double amount) {

        User sender = userRepo.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver = userRepo.findByAccountNumber(receiverAccount);

        if (receiver == null) {
            throw new RuntimeException("Receiver account not found");
        }

        if (sender.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        userRepo.save(sender);
        userRepo.save(receiver);

        transactionRepo.save(new Transaction(senderId, "TRANSFER_OUT", amount));
        transactionRepo.save(new Transaction(receiver.getId(), "TRANSFER_IN", amount));

        return sender;
    }

    public List<Transaction> getTransactions(int id) {
        return transactionRepo.findByUserId(id);
    }
}
