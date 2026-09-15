START

// Create accounts
SET alice = 200
SET bob = 50

// Track fraud data
SET withdrawals = 0
SET average = 100
SET lastWithdrawTime = 0

// Example actions
CALL Deposit(alice, 50)
CALL Withdraw(alice, 30)
CALL Transfer(alice, bob, 100)

FUNCTION Deposit(account, amount)

    // Step 1: Validate amount
    IF amount <= 0 THEN
        PRINT "Invalid amount"
        RETURN
    END IF

    // Step 2: Add money
    account = account + amount

    // Step 3: Update average
    average = (average + amount) / 2

    // Step 4: Confirm
    PRINT "Deposited. New balance: " + account

END FUNCTION

FUNCTION Withdraw(account, amount)

    // Step 1: Validate amount
    IF amount <= 0 THEN
        PRINT "Invalid amount"
        RETURN
    END IF

    // Step 2: Rule 1 — Not enough money
    IF amount > account THEN
        PRINT "Blocked: Insufficient funds"
        RETURN
    END IF

    // Step 3: Rule 2 — Too many withdrawals in 10 seconds
    SET now = CURRENT TIME
    IF (now - lastWithdrawTime) > 10 THEN
        withdrawals = 0
    END IF
    IF withdrawals >= 3 THEN
        PRINT "Blocked: Too many withdrawals"
        RETURN
    END IF

    // Step 4: Rule 3 — Unusual spending spike
    IF amount > (5 * average) THEN
        PRINT "Blocked: Unusual spending"
        RETURN
    END IF

    // Step 5: All checks passed — execute
    account = account - amount
    withdrawals = withdrawals + 1
    lastWithdrawTime = now
    average = (average + amount) / 2

    // Step 6: Confirm
    PRINT "Withdrawn. New balance: " + account

END FUNCTION

FUNCTION Transfer(sender, receiver, amount)

    // Step 1: Validate amount
    IF amount <= 0 THEN
        PRINT "Invalid amount"
        RETURN
    END IF

    // Step 2: Rule 1 — Not enough money
    IF amount > sender THEN
        PRINT "Blocked: Insufficient funds"
        RETURN
    END IF

    // Step 3: Rule 2 — Too many withdrawals in 10 seconds
    SET now = CURRENT TIME
    IF (now - lastWithdrawTime) > 10 THEN
        withdrawals = 0
    END IF
    IF withdrawals >= 3 THEN
        PRINT "Blocked: Too many withdrawals"
        RETURN
    END IF

    // Step 4: Rule 3 — Unusual spending spike
    IF amount > (5 * average) THEN
        PRINT "Blocked: Unusual spending"
        RETURN
    END IF

    // Step 5: All checks passed — execute
    sender = sender - amount
    receiver = receiver + amount
    withdrawals = withdrawals + 1
    lastWithdrawTime = now
    average = (average + amount) / 2

    // Step 6: Confirm
    PRINT "Transferred. Sender: " + sender + " Receiver: " + receiver

END FUNCTION

END