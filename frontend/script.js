const API = "http://localhost:8081/api/user";

/* ================= AUTH CHECK ================= */

function checkAuth() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!user || !token) {
        window.location.href = "login.html";
    }
}

/* ================= LOGIN ================= */

async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {
        const response = await fetch(API + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            alert("Invalid email or password");
            return;
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));

        window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Login failed:", error);
        alert("Backend not running or connection error");
    }
}

/* ================= INIT DASHBOARD ================= */

function initDashboard() {

    checkAuth();

    const user = JSON.parse(localStorage.getItem("user"));

    document.getElementById("welcomeText").innerText =
        "Welcome, " + user.name;

    document.getElementById("accountNumberText").innerText =
        "Account No: " + user.accountNumber;

    document.getElementById("balanceText").innerText =
        "Available Balance: ₹ " + user.balance;

    loadTransactions();
}

/* ================= LOAD TRANSACTIONS ================= */

async function loadTransactions() {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(
            API + "/transactions/" + user.id,
            {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) throw new Error("Unauthorized");

        let transactions = await response.json();

        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        const table = document.getElementById("transactions");
        table.innerHTML = "";

        transactions.forEach(tx => {

            const row = document.createElement("tr");

            const typeCell = document.createElement("td");
            typeCell.innerText = tx.type;

            const dateCell = document.createElement("td");
            dateCell.innerText = new Date(tx.date).toLocaleString("en-IN");

            const amountCell = document.createElement("td");
            amountCell.style.textAlign = "right";
            amountCell.innerText = "₹ " + tx.amount;

            if (tx.type.includes("DEPOSIT") || tx.type.includes("IN")) {
                amountCell.classList.add("deposit");
            } else {
                amountCell.classList.add("withdraw");
            }

            row.appendChild(typeCell);
            row.appendChild(dateCell);
            row.appendChild(amountCell);

            table.appendChild(row);
        });

    } catch (error) {
        console.error("Transaction load failed", error);
    }
}

/* ================= DEPOSIT ================= */

async function deposit() {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    try {
        const response = await fetch(
            API + "/deposit/" + user.id + "/" + amount,
            {
                method: "POST",
                headers: { "Authorization": "Bearer " + token }
            }
        );

        if (!response.ok) throw new Error("Deposit failed");

        const updatedUser = await response.json();

        localStorage.setItem("user", JSON.stringify(updatedUser));

        document.getElementById("balanceText").innerText =
            "Available Balance: ₹ " + updatedUser.balance;

        document.getElementById("amount").value = "";

        loadTransactions();

    } catch (error) {
        alert("Deposit failed");
    }
}

/* ================= WITHDRAW ================= */

async function withdraw() {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    try {
        const response = await fetch(
            API + "/withdraw/" + user.id + "/" + amount,
            {
                method: "POST",
                headers: { "Authorization": "Bearer " + token }
            }
        );

        if (!response.ok) throw new Error("Withdraw failed");

        const updatedUser = await response.json();

        localStorage.setItem("user", JSON.stringify(updatedUser));

        document.getElementById("balanceText").innerText =
            "Available Balance: ₹ " + updatedUser.balance;

        document.getElementById("amount").value = "";

        loadTransactions();

    } catch (error) {
        alert("Withdraw failed");
    }
}

/* ================= TRANSFER ================= */

async function transferMoney() {

    checkAuth();

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const accountNumber = document.getElementById("beneficiary").value.trim();
    const amount = document.getElementById("transferAmount").value;

    if (!accountNumber || !amount || amount <= 0) {
        alert("Enter valid details");
        return;
    }

    try {
        const response = await fetch(
            API + "/transfer/" + user.id +
            "?accountNumber=" + accountNumber +
            "&amount=" + amount,
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        if (!response.ok) throw new Error("Transfer failed");

        const updatedUser = await response.json();

        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("Transfer Successful!");

        window.location.href = "dashboard.html";

    } catch (error) {
        alert("Transfer failed");
        console.error(error);
    }
}

/* ================= REGISTER ================= */

async function register(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch(API + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            alert("Registration failed. Email may already exist.");
            return;
        }

        alert("Registration successful! Please login.");
        window.location.href = "login.html";

    } catch (error) {
        alert("Backend not running or server error");
    }
}

/* ================= NAVIGATION ================= */

function goToTransfer() {
    window.location.href = "transfer.html";
}

/* ================= LOGOUT ================= */

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
