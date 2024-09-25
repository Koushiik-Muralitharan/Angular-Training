import { Component, OnInit } from '@angular/core';
import { TranactionsService } from '../../../Services/tranactions.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { transactionDetails } from '../../../models/Transactionmodel';
import { UserStorageService } from '../../../Storage/user-storage.service';
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent  {
  transactionType: string = '';
  expenseTypes: string[] = [];
  balance:number=0;
  income:number=0;
  expense:number=0;
  transactions: transactionDetails[] = [];

  constructor(private transactionService: TranactionsService, private transactionStorage:UserStorageService) {}


  ngOnInit():void{
    this.loadTransactions();
    this.transactionService.calculateTransaction();
    this.updateTransactionSummary();
  }

  updateTransactionSummary(): void {
    const { income, expense } = this.transactionService.calculateTransaction();
    this.income = income;
    this.expense = expense;
    this.balance = income-expense;
  }
  
  onTransactionTypeChange(type: string): void {
    if (type === 'Income' || type === 'Expense') {
      this.expenseTypes = this.transactionService.getExpenseTypes(type);
    } else {
      this.expenseTypes = []; 
    }
  }

  onTransactionSubmit(form:NgForm){
    //console.log(form);
    this.transactionService.addTransaction(form);
    this.loadTransactions();
    this.transactionService.calculateTransaction();
    this.updateTransactionSummary();
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.loggedUserTransaction();
  }
}
