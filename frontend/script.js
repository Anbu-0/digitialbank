const BASE_URL = "http://localhost:8081/api/user";

function login() {
    fetch(BASE_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => {

        if (data.error) {
            document.getElementById("loginError").innerText = "Invalid Credentials";
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

function loadDashboard() {

    document.getElementById("welcome").innerText =
        "Welcome, " + localStorage.getItem("name");

    document.getElementById("account").innerText =
        "Account No: " + localStorage.getItem("accountNumber");

    document.getElementById("balance").innerText =
        "Balance: ₹ " + localStorage.getItem("balance");

    loadTransactions();
}

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
        document.getElementById("errorMessage").innerText = "Enter valid amount";
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
        document.getElementById("errorMessage").innerText = "";
        animateBalance(data.balance);
        document.getElementById("amount").value = "";
        loadTransactions();
    })
    .catch(err => {
        document.getElementById("errorMessage").innerText = err.message;
    });
}

function animateBalance(newBalance) {

    let balanceElement = document.getElementById("balance");
    let current = parseFloat(localStorage.getItem("balance"));

    let increment = (newBalance - current) / 20;
    let counter = 0;

    let isIncrease = newBalance > current;

    let interval = setInterval(() => {
        current += increment;
        balanceElement.innerText = "Balance: ₹ " + current.toFixed(2);
        counter++;

        if (counter >= 20) {
            clearInterval(interval);
            balanceElement.innerText = "Balance: ₹ " + newBalance.toFixed(2);
            localStorage.setItem("balance", newBalance);

            balanceElement.classList.add(
                isIncrease ? "flash-green" : "flash-red"
            );

            setTimeout(() => {
                balanceElement.classList.remove("flash-green", "flash-red");
            }, 500);
        }
    }, 20);
}

function loadTransactions() {

    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    fetch(BASE_URL + "/transactions/" + userId, {
        headers: { "Authorization": "Bearer " + token }
    })
    .then(res => res.json())
    .then(data => {

        let container = document.getElementById("transactions");
        container.innerHTML = "";

        data.forEach(tx => {

            let div = document.createElement("div");
            div.classList.add("transaction-item");

            if (tx.type === "DEPOSIT") {
                div.classList.add("deposit");
            } else {
                div.classList.add("withdraw");
            }

            div.innerText = tx.type + " ₹" + tx.amount;
            container.appendChild(div);
        });
    });
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
