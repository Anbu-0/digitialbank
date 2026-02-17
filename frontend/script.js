const API = "http://localhost:8081/api";

/* ===================================================
   AUTH HELPERS
=================================================== */

function getToken() {
    return localStorage.getItem("token");
}

function getUserId() {
    return localStorage.getItem("userId");
}

function checkAuth() {
    if (!getToken() || !getUserId()) {
        window.location.href = "login.html";
    }
}


/* ===================================================
   LOGIN
=================================================== */

async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch(API + "/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error("Invalid email or password");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("accountNumber", data.accountNumber);
        localStorage.setItem("balance", data.balance);

        window.location.href = "dashboard.html";

    } catch (error) {
        alert(error.message);
    }
}


/* ===================================================
   REGISTER
=================================================== */

async function register(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    try {
        const response = await fetch(API + "/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        alert("Account created successfully!");
        window.location.href = "login.html";

    } catch (error) {
        alert(error.message);
    }
}


/* ===================================================
   DASHBOARD LOAD
=================================================== */

async function loadDashboard() {

    checkAuth();

    document.getElementById("welcomeBig").innerText =
        "Welcome, " + localStorage.getItem("name");

    document.getElementById("accountInfo").innerText =
        "Account No: " + localStorage.getItem("accountNumber");

    document.getElementById("balanceBig").innerText =
        "Available Balance: ₹ " + localStorage.getItem("balance");

    await loadTransactions();
}


/* ===================================================
   LOAD TRANSACTIONS
=================================================== */

async function loadTransactions() {

    const response = await fetch(
        API + "/user/transactions/" + getUserId(),
        {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    if (!response.ok) {
        console.error("Failed to load transactions");
        return;
    }

    const transactions = await response.json();
    const table = document.getElementById("transactions");
    table.innerHTML = "";

    transactions.forEach(tx => {

        const row = document.createElement("tr");

        const typeCell = document.createElement("td");
        typeCell.innerText = tx.type;

        const amountCell = document.createElement("td");
        amountCell.style.textAlign = "right";
        amountCell.innerText = "₹ " + tx.amount;

        if (tx.type.includes("DEPOSIT") || tx.type.includes("IN")) {
            amountCell.classList.add("deposit");
        } else {
            amountCell.classList.add("withdraw");
        }

        row.appendChild(typeCell);
        row.appendChild(amountCell);
        table.appendChild(row);
    });
}


/* ===================================================
   DEPOSIT
=================================================== */

async function deposit() {

    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    const response = await fetch(
        API + "/user/deposit/" + getUserId() + "/" + amount,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    if (!response.ok) {
        alert("Deposit failed");
        return;
    }

    const updatedUser = await response.json();
    localStorage.setItem("balance", updatedUser.balance);

    await loadDashboard();
}


/* ===================================================
   WITHDRAW
=================================================== */

async function withdraw() {

    const amount = document.getElementById("amount").value;

    if (!amount || amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    const response = await fetch(
        API + "/user/withdraw/" + getUserId() + "/" + amount,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    if (!response.ok) {
        alert("Withdraw failed");
        return;
    }

    const updatedUser = await response.json();
    localStorage.setItem("balance", updatedUser.balance);

    await loadDashboard();
}


/* ===================================================
   TRANSFER
=================================================== */

async function transferMoney() {

    checkAuth();

    const toAccount = document.getElementById("toAccount").value;
    const amount = document.getElementById("transferAmount").value;

    if (!toAccount || !amount || amount <= 0) {
        alert("Enter valid details");
        return;
    }

    const response = await fetch(
        API + "/user/transfer/" + getUserId() +
        "?accountNumber=" + toAccount +
        "&amount=" + amount,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    if (!response.ok) {
        alert("Transfer failed");
        return;
    }

    const updatedUser = await response.json();
    localStorage.setItem("balance", updatedUser.balance);

    document.getElementById("transferMessage").innerText =
        "Transfer successful!";
}

function goToTransfer() {
    window.location.href = "transfer.html";
}


/* ===================================================
   LOGOUT
=================================================== */

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
