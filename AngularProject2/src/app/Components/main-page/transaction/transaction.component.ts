import { Component, OnInit } from '@angular/core';
import { TranactionsService } from '../../../Services/tranactions.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { transactionDetails } from '../../../models/Transactionmodel';
import { UserStorageService } from '../../../Storage/user-storage.service';
import { userdetails } from '../../../models/Usermodel';
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
  transactionAmount: number | null = null;
  transactionDate: string = '';
  expenseMethods: string ='';
  selectedTransactionIndex: number | null = null;
  ButtonName:string = 'Submit';
  currentDate!: string;

  constructor(private transactionService: TranactionsService,private userStorage:UserStorageService) {
   
  }


  ngOnInit():void{
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.loadTransactions();
    this.transactionService.calculateTransaction();
    this.updateTransactionSummary();
  }

  updateTransactionSummary(): void {
    const index = this.transactionService.getLoggedUserIndex();
    const userArray: userdetails[] = this.userStorage.getUser();
    this.income = userArray[index].income;
    this.expense = userArray[index].expense;
    this.balance = this.income-this.expense;
  }
  
  onTransactionTypeChange(type: string): void {
    if (type === 'Income' || type === 'Expense') {
      this.expenseTypes = this.transactionService.getExpenseTypes(type);
    } else {
      this.expenseTypes = []; 
    }
  }

  edit(tindex:number){
    console.log(tindex);
     const index = this.transactionService.getLoggedUserIndex();
     const userArray: userdetails[] = this.userStorage.getUser();
     this.transactionType = userArray[index].transactions[tindex].transactionMethod;
     this.onTransactionTypeChange(this.transactionType);
     this.expenseMethods = userArray[index].transactions[tindex].expenseMethod;
     this.transactionAmount = userArray[index].transactions[tindex].amount;
     this.transactionDate = userArray[index].transactions[tindex].date;
     this.selectedTransactionIndex = tindex;
     this.ButtonName='Update';

   }

   delete(index:number){
    console.log(index+"going to delete...");
   this.transactionService.deleteTransaction(index);
   this.loadTransactions();
   this.transactionService.calculateTransaction();
   this.updateTransactionSummary();
   }

  onTransactionSubmit(form:NgForm){
    //console.log(form);
    if(this.selectedTransactionIndex!==null){
      console.log("I am going to edit...");
      this.transactionService.editTransaction(this.selectedTransactionIndex, form);
      this.selectedTransactionIndex=null;
      this.ButtonName='Submit';
    }else{
      this.transactionService.addTransaction(form);
    }
    
    this.loadTransactions();
    this.transactionService.calculateTransaction();
    this.updateTransactionSummary();
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.loggedUserTransaction();
  }

  
}
