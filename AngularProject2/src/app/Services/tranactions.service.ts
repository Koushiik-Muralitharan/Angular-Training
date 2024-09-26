import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { transactionDetails } from '../models/Transactionmodel';
import { userdetails } from '../models/Usermodel';
import { UserStorageService } from '../Storage/user-storage.service';
@Injectable({
  providedIn: 'root',
})
export class TranactionsService {
  private expenseOptions: Record<'Income' | 'Expense', string[]> = {
    Income: ['Salary', 'Bonus', 'Investment'],
    Expense: ['Food', 'Transport', 'Shopping', 'Entertainment'],
  };

  constructor(private userStorage: UserStorageService) {}

  // to get the details of the logged user.
  getLoggedInUser(): userdetails {
    const user = sessionStorage.getItem('loggedInUser') || '{}';
    return JSON.parse(user);
  }

  // to get the index of the logged user.
  getLoggedUserIndex(): number {
    const userInfo = this.getLoggedInUser();
    const userArray: userdetails[] = this.userStorage.getUser();
    return userArray.findIndex((user) => user.id === userInfo.id);
  }

  // load the logged user transactions.
  loggedUserTransaction(): transactionDetails[] {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index = this.getLoggedUserIndex();
    return userArray[index].transactions;
  }

  // change the expense categories based on the transaction

  getExpenseTypes(transactionType: 'Income' | 'Expense'): string[] {
    return this.expenseOptions[transactionType] || [];
  }

  // add a transaction
  addTransaction(form: NgForm) {
    const userInfo = this.getLoggedInUser();
    const userArray = this.userStorage.getUser();
    //console.log(userInfo);
    const {
      transactionstype,
      expensetype,
      transactionAmount,
      transactiondate,
    } = form.value;
    const newTransaction: transactionDetails = {
      tid: Date.now() + '',
      id: userInfo.id,
      email: userInfo.email,
      transactionMethod: transactionstype,
      expenseMethod: expensetype,
      amount: parseInt(transactionAmount),
      date: transactiondate,
    };
    if (this.getLoggedUserIndex() > -1) {
      const index = this.getLoggedUserIndex();
      userArray[index].transactions.push(newTransaction);
      this.userStorage.setUser(userArray);
    } else {
      console.log('no such user exists...');
    }
    form.resetForm();
  }

  calculateTransaction(): void {
    const tranactions = this.loggedUserTransaction();
    const userArray: userdetails[] = this.userStorage.getUser();

    if (this.getLoggedUserIndex() > -1) {
      const index = this.getLoggedUserIndex();
      userArray[index].income = 0;
      userArray[index].expense = 0;
      tranactions.forEach((tranaction) => {
        if (tranaction.transactionMethod === 'Income') {
          userArray[index].income += tranaction.amount;
        } else {
          userArray[index].expense += tranaction.amount;
        }
      });
      this.userStorage.setUser(userArray);
    } else {
      console.log('no such user exists...');
    }
  }

  editTransaction(tindex: number, form: NgForm) {
    const userArray: userdetails[] = this.userStorage.getUser();
    const index = this.getLoggedUserIndex();
    const oldTransaction = userArray[index].transactions[tindex];
    const {
      transactionstype,
      expensetype,
      transactionAmount,
      transactiondate,
    } = form.value;
    const newTransaction: transactionDetails = {
      tid: oldTransaction.tid,
      id: oldTransaction.id,
      email: oldTransaction.email,
      transactionMethod: transactionstype,
      expenseMethod: expensetype,
      amount: parseInt(transactionAmount),
      date: transactiondate,
    };
    userArray[index].transactions[tindex] = newTransaction;
    this.userStorage.setUser(userArray);
    //console.log(oldTransaction);
    form.resetForm();
  }

  deleteTransaction(tindex:number){
    const userArray: userdetails[] = this.userStorage.getUser();
    const index = this.getLoggedUserIndex();
    userArray[index].transactions.splice(tindex,1);

    this.userStorage.setUser(userArray);
  }
}
