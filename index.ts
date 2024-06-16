#!/usr/bin/env node

import inquirer from "inquirer";


// Interface Bank Account

interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

// Creating class of Bank Account
class BankAccount implements BankAccount{
    accountNumber  : number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

// Debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount;
        console.log(`withdrawl of $${amount} successful. Remaining balance: $${this.balance}`);
    }else {
        console.log("Insufficient balance.");
    }
}   

// Credit money 
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposit of $${amount} successfull. Remaining balance: $${this.balance}`);
    
}

// Check balance
checkBalance(): void {
    console.log(`current balance: $${this.balance}`);

}
}

// Customer class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}   

// Create bank accounts

const accounts: BankAccount[] = [
    new BankAccount  (1001, 500),
    new BankAccount  (1002, 1000),
    new BankAccount  (1003, 2000),
];

// Create customers
const customers: Customer[] = [
    new Customer ("Alishba", "tayyaba", "Female", 20, 3109996666, accounts[0]),
    new Customer ("Ahmed", "Malik", "Male", 24, 3229955666, accounts[1]),
    new Customer ("Kainat", "Raniya", "Female", 18, 3109561176, accounts[2]),
]

// Function to interact with bank account

async function service() {
    do{
         const accountNumberInput = await inquirer.prompt({
             name: "accountNumber",
             type: "number",
             message: "Enter your account number:"
         })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`welcome, ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an Operation",
                choices: ["Deposit", "Withdreaw", "Check Balance", "Exit"]
            }]);

            switch(ans.select){
                case "Deposit":
                   const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                     customer.account.deposit(depositAmount.amount)
                      break;
                case "Withdreaw" :
                        const withdrawAmount = await inquirer.prompt({
                             name: "amount",
                             type: "number",
                             message: "Enter the amount to withdraw:"
                        })
                        customer.account.withdraw
                        (withdrawAmount.amount)
                        break;
               case "Check Balance":
                   customer.account.checkBalance();
                   break;
               case "Exit":
                   console.log("Exiting bank program...")
                   console.log("\n THANK YOU FOR USING OUR BANK SERVICES. HAVE A NICE DAY!");
                   return;
           } 

        } else {
            console.log("Invalid account number. Please try again.");
        }
    } while(true)                    
}

service()