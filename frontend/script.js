const BASE_URL = "http://localhost:8081/api/user";

/* ===========================
   REGISTER
=========================== */
function register() {

    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let password = document.getElementById("regPassword").value;

    if (!name || !email || !password) {
        document.getElementById("registerError").innerText =
            "All fields are required";
        return;
    }

    fetch(BASE_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Registration failed");
        return res.json();
    })
    .then(data => {

        alert("Account created successfully!");

        window.location.href = "login.html";
    })
    .catch(err => {
        document.getElementById("registerError").innerText =
            err.message;
    });
}

/* ===========================
   LOGIN
=========================== */
function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password) {
        document.getElementById("loginError").innerText =
            "Enter email and password";
        return;
    }

    fetch(BASE_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {

        if (data.error) {
            document.getElementById("loginError").innerText =
                "Invalid Credentials";
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("name", data.name);
        localStorage.setItem("accountNumber", data.accountNumber);
        localStorage.setItem("balance", data.balance);

        window.location.href = "dashboard.html";
    });
}

/* ===========================
   DASHBOARD LOAD
=========================== */
function loadDashboard() {

    document.getElementById("welcome").innerText =
        "Welcome, " + localStorage.getItem("name");

    document.getElementById("account").innerText =
        "Account No: " + localStorage.getItem("accountNumber");

    document.getElementById("balance").innerText =
        "Balance: ₹ " + localStorage.getItem("balance");

    loadTransactions();
}

/* ===========================
   DEPOSIT / WITHDRAW
=========================== */
function deposit() {
    handleTransaction("deposit");
}

function withdraw() {
    handleTransaction("withdraw");
}

function handleTransaction(type) {

    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    let amount = parseFloat(document.getElementById("amount").value);

    if (!amount || amount <= 0) {
        document.getElementById("errorMessage").innerText =
            "Enter valid amount";
        return;
    }

    fetch(BASE_URL + "/" + type + "/" + userId + "/" + amount, {
        method: "POST",
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => {
        if (!res.ok) throw new Error("Transaction Failed");
        return res.json();
    })
    .then(data => {

        localStorage.setItem("balance", data.balance);
        document.getElementById("amount").value = "";

        loadDashboard();
    })
    .catch(err => {
        document.getElementById("errorMessage").innerText =
            err.message;
    });
}

/* ===========================
   TRANSFER
=========================== */
function transfer() {

    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    let receiverAccount = document.getElementById("receiverAccount").value;
    let amount = parseFloat(document.getElementById("transferAmount").value);

    if (!receiverAccount || !amount || amount <= 0) {
        document.getElementById("transferError").innerText =
            "Enter valid transfer details";
        return;
    }

    fetch(BASE_URL + "/transfer/" + userId +
          "?accountNumber=" + receiverAccount +
          "&amount=" + amount, {

        method: "POST",
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => {
        if (!res.ok) throw new Error("Transfer failed");
        return res.json();
    })
    .then(data => {

        localStorage.setItem("balance", data.balance);

        window.location.href = "dashboard.html";
    })
    .catch(err => {
        document.getElementById("transferError").innerText =
            err.message;
    });
}

/* ===========================
   TRANSACTIONS
=========================== */
function loadTransactions() {

    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    fetch(BASE_URL + "/transactions/" + userId, {
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => res.json())
    .then(data => {

        let container = document.getElementById("transactions");
        if (!container) return;

        container.innerHTML = "";

        data.forEach(tx => {

            let div = document.createElement("div");
            div.classList.add("transaction-item");

            if (tx.type === "DEPOSIT" || tx.type === "TRANSFER_IN") {
                div.classList.add("deposit");
            } else {
                div.classList.add("withdraw");
            }

            div.innerText = tx.type + " ₹" + tx.amount;
            container.appendChild(div);
        });
    });
}

/* ===========================
   NAVIGATION
=========================== */
function goToTransfer() {
    window.location.href = "transfer.html";
}

function goBack() {
    window.location.href = "dashboard.html";
}

/* ===========================
   LOGOUT
=========================== */
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
