import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { transactionDetails } from '../models/Transactionmodel';
import { userdetails } from '../models/Usermodel';
import { UserStorageService } from '../Storage/user-storage.service';
@Injectable({
  providedIn: 'root'
})
export class TranactionsService {

  private expenseOptions: Record<'Income' | 'Expense', string[]> = {
    Income: ['Salary', 'Bonus', 'Investment'],
    Expense: ['Food', 'Transport', 'Shopping', 'Entertainment']
  };

  constructor(private userStorage:UserStorageService) { }

  // to get the details of the logged user.
  getLoggedInUser(): userdetails {
    const user = sessionStorage.getItem('loggedInUser')||'{}'; 
      return JSON.parse(user); 
  }

  // to get the index of the logged user.
  getLoggedUserIndex(): number {
    const userInfo = this.getLoggedInUser();
    const userArray:userdetails[] = this.userStorage.getUser();
    return userArray.findIndex((user)=> user.id === userInfo.id);
  }

  loggedUserTransaction(): transactionDetails[] {
    const userArray:userdetails[] = this.userStorage.getUser();
    const index= this.getLoggedUserIndex();
    return userArray[index].transactions;
  }

  // change the expense categories based on the transaction 

  getExpenseTypes(transactionType: 'Income' | 'Expense'): string[] {
    return this.expenseOptions[transactionType] || [];
  }

  // add a transaction 
  addTransaction(form:NgForm){
    const userInfo = this.getLoggedInUser();
    const userArray = this.userStorage.getUser();
    //console.log(userInfo);
    const {transactionstype,expensetype,transactionAmount,transactiondate} = form.value;
    const newTransaction: transactionDetails = {
      tid:Date.now()+"",
      id:userInfo.id,
      email: userInfo.email,
      transactionMethod:transactionstype,
      expenseMethod:expensetype,
      amount: parseInt(transactionAmount),
      date:transactiondate
    }
      if(this.getLoggedUserIndex()>-1){
        const index = this.getLoggedUserIndex();
        userArray[index].transactions.push(newTransaction);
        this.userStorage.setUser(userArray);
      }else{
        console.log('no such user exists...');
      }
      form.resetForm();
  }

  calculateTransaction(): { income: number; expense: number } {
    const tranactions = this.loggedUserTransaction();
    var income = 0;
    var expense = 0;

    tranactions.forEach((tranaction)=>{
      if(tranaction.transactionMethod==='Income'){
        income+=tranaction.amount;
      }else{
        expense+=tranaction.amount;
      }
    })
    console.log(income);
    console.log(expense);
    return {income, expense}
  }
}
