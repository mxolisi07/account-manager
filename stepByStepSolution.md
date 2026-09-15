Step-by-Step System Flow

1. User Initiates a Transaction
User (Alice/Bob) chooses--> Deposit, Withdraw, or Transfer
System receives --> account ID, amount, (and target account for transfers)

2. Validate the Request
Is the amount positive and valid?
Does the account exist?
For transfers --> does the target account exist?
NB> If any fail --> Reject the request immediately

3. Apply Rule Checks
NB> Only for Withdrawal & Transfer

Rule 1 — Insufficient Funds
Is amount wanted > current balance?
--> If Yes: Block the transaction and display ("Insufficient funds")

Rule 2 — Rapid Withdrawals
The system count withdrawals in the last 10 seconds
Is count ≥ 3?
--> If Yes: Block the transaction and display ("Too many withdrawals")

Rule 3 — Spending Spikes
Compute user's average transaction size
Is amount > 5 × average?
--> Yes: Block the transaction with the following message in display ("Unusual spending")
--> If any rule blocks: System stops, log the attempt, and notify user

4. Execute the Transaction
Deposit: balance += amount
Withdraw: balance -= amount

Transfer: sender.balance -= amount AND receiver.balance += amount (In this case Alice will be the receiver and Bob will act as the sender)

5. Update Records
Log the transaction (timestamp, amount, type, status)
Update the user's average transaction size
Update the withdrawal counter/timestamp (for Rule 2)

6. Confirmation to User
Return success message + new balance (or block reason)

