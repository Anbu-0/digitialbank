package com.bank.banking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;
    private String type;
    private double amount;
    private LocalDateTime date;

    // Default constructor
    public Transaction() {
        this.date = LocalDateTime.now();
    }

    // Constructor used in service
    public Transaction(int userId, String type, double amount) {
        this.userId = userId;
        this.type = type;
        this.amount = amount;
        this.date = LocalDateTime.now();
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
