// ============================================
// BANK ACCOUNT SYSTEM - FRAUD DETECTION TEST
// ============================================

// ---------- SETUP ACCOUNTS ----------
let alice = {
    name: "Alice",
    balance: 200,
    withdrawals: 0,
    lastWithdrawTime: 0,
    average: 100
};

let bob = {
    name: "Bob",
    balance: 50,
    withdrawals: 0,
    lastWithdrawTime: 0,
    average: 100
};

// ---------- DEPOSIT ----------
function deposit(account, amount) {
    if (amount <= 0) {
        console.log("Invalid amount");
        return;
    }

    account.balance += amount;
    account.average = (account.average + amount) / 2;

    console.log(`Deposited ${amount} to ${account.name}. New balance: ${account.balance}`);
}

// ---------- WITHDRAW ----------
function withdraw(account, amount) {
    if (amount <= 0) {
        console.log("Invalid amount");
        return;
    }

    // Rule 1: Insufficient funds
    if (amount > account.balance) {
        console.log(`Blocked (${account.name}): Insufficient funds`);
        return;
    }

    // Rule 2: Rapid withdrawals
    let now = Date.now();
    if (now - account.lastWithdrawTime > 10000) {
        account.withdrawals = 0; // reset after 10 seconds
    }
    if (account.withdrawals >= 3) {
        console.log(`Blocked (${account.name}): Too many withdrawals in 10s`);
        return;
    }

    // Rule 3: Spending spike
    if (amount > 5 * account.average) {
        console.log(`Blocked (${account.name}): Unusual spending spike`);
        return;
    }

    // All checks passed
    account.balance -= amount;
    account.withdrawals += 1;
    account.lastWithdrawTime = now;
    account.average = (account.average + amount) / 2;

    console.log(`Withdrew ${amount} from ${account.name}. New balance: ${account.balance}`);
}

// ---------- TRANSFER ----------
function transfer(sender, receiver, amount) {
    if (amount <= 0) {
        console.log("Invalid amount");
        return;
    }

    // Rule 1
    if (amount > sender.balance) {
        console.log(`Blocked (${sender.name}): Insufficient funds`);
        return;
    }

    // Rule 2
    let now = Date.now();
    if (now - sender.lastWithdrawTime > 10000) {
        sender.withdrawals = 0;
    }
    if (sender.withdrawals >= 3) {
        console.log(`Blocked (${sender.name}): Too many withdrawals in 10s`);
        return;
    }

    // Rule 3
    if (amount > 5 * sender.average) {
        console.log(`Blocked (${sender.name}): Unusual spending spike`);
        return;
    }

    // Execute
    sender.balance -= amount;
    receiver.balance += amount;
    sender.withdrawals += 1;
    sender.lastWithdrawTime = now;
    sender.average = (sender.average + amount) / 2;

    console.log(`Transferred ${amount} from ${sender.name} to ${receiver.name}`);
    console.log(`   ${sender.name}: ${sender.balance} | ${receiver.name}: ${receiver.balance}`);
}

// ---------- HELPER ----------
function showBalances() {
    console.log(`\nBalances → ${alice.name}: ${alice.balance} | ${bob.name}: ${bob.balance}\n`);
}

// ============================================
// TEST RUN
// ============================================

console.log("=== STARTING TESTS ===\n");

showBalances();

// Test 1: Normal deposit
deposit(alice, 50);

// Test 2: Normal withdraw
withdraw(alice, 30);

// Test 3: Normal transfer
transfer(alice, bob, 100);

// Test 4: Insufficient funds
withdraw(bob, 9999);

// Test 5: Rapid withdrawals (should block on 4th)
console.log("\n--- Testing rapid withdrawals ---");
withdraw(bob, 10);
withdraw(bob, 10);
withdraw(bob, 10);
withdraw(bob, 10); // should be blocked

// Test 6: Spending spike
console.log("\n--- Testing spending spike ---");
withdraw(alice, 10000); // should block

showBalances();
console.log("=== TESTS COMPLETE ===");