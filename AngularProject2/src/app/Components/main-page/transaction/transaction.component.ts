import { Component, OnInit } from '@angular/core';
import { TranactionsService } from '../../../Services/tranactions.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { transactionDetails } from '../../../models/Transactionmodel';
import { UserStorageService } from '../../../Storage/user-storage.service';
import { userdetails } from '../../../models/Usermodel';
import { AnalyticsComponent } from './analytics/analytics.component';
import { analyticsDetails } from '../../../models/analyticsmodal';
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [FormsModule, CommonModule, AnalyticsComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  transactionType: string = '';
  expenseTypes: string[] = [];
  chartLabels: number[] = [];
  chartColors: string[] = [];
  chartDataLabels: string[] = [];
  balance: number = 0;
  income: number = 0;
  expense: number = 0;
  transactions: transactionDetails[] = [];
  transactionAmount: number | null = null;
  transactionDate: string = '';
  expenseMethods: string = '';
  selectedTransactionIndex: number | null = null;
  ButtonName: string = 'Submit';
  currentDate!: string;
  transactionPopUp: Boolean = false;
  refreshFlag: boolean = false;

  constructor(
    private transactionService: TranactionsService,
    private userStorage: UserStorageService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.loadTransactions();
    this.transactionService.calculateTransaction();
    this.updateTransactionSummary();
  }

  ngDoCheck(): void {
    if (this.transactionService.goalChanges) {
      this.loadTransactions();
      this.updateTransactionSummary();
      this.transactionService.goalChanges = false;
    }
  }

  transactionModal(): Boolean {
    return (this.transactionPopUp = !this.transactionPopUp);
  }

  refreshContent() {
    this.refreshFlag = !this.refreshFlag;
  }

  updateTransactionSummary(): void {
    const index = this.transactionService.getLoggedUserIndex();
    const userArray: userdetails[] = this.userStorage.getUser();
    this.income = userArray[index].income;
    this.expense = userArray[index].expense;
    this.balance = userArray[index].balance;
  }

  onTransactionTypeChange(type: string): void {
    if (type === 'Income' || type === 'Expense') {
      this.expenseTypes = this.transactionService.getExpenseTypes(type);
    } else {
      this.expenseTypes = [];
    }
  }

  onChartChange(type: string): void {
    if (
      type === 'Food' ||
      type === 'Transport' ||
      type === 'Shopping' ||
      type === 'Entertainment' ||
      type === 'Expense'
    ) {
      const analytics = this.transactionService.getAnalyticsOption(type);
      this.chartLabels = analytics.data;
      this.chartColors = analytics.colors;
      this.chartDataLabels = analytics.labels;
    } else {
      this.chartLabels = [];
      this.chartColors = [];
      this.chartDataLabels = [];
    }
    this.refreshContent();
  }

  edit(tindex: number) {
    console.log(tindex);
    const index = this.transactionService.getLoggedUserIndex();
    const userArray: userdetails[] = this.userStorage.getUser();
    this.transactionType =
      userArray[index].transactions[tindex].transactionMethod;
    this.onTransactionTypeChange(this.transactionType);
    this.expenseMethods = userArray[index].transactions[tindex].expenseMethod;
    this.transactionAmount = userArray[index].transactions[tindex].amount;
    this.transactionDate = userArray[index].transactions[tindex].date;
    this.selectedTransactionIndex = tindex;
    this.ButtonName = 'Update';
    this.transactionModal();
  }

  delete(index: number) {
    //console.log(index+"going to delete...");

    this.transactionService.deleteTransaction(index);
    this.loadTransactions();
    this.onChartChange('Expense');
    this.transactionService.calculateTransaction();
    this.updateTransactionSummary();
    this.refreshContent();
  }

  onTransactionSubmit(form: NgForm) {
    //console.log(form);
    if (this.selectedTransactionIndex !== null) {
      console.log('I am going to edit...');
      this.transactionService.editTransaction(
        this.selectedTransactionIndex,
        form
      );
      this.selectedTransactionIndex = null;
      this.ButtonName = 'Submit';
      this.onChartChange('Expense');
      this.refreshContent();
    } else {
      this.transactionService.addTransaction(form);
      this.onChartChange('Expense');
      this.refreshContent();
    }

    this.loadTransactions();
    this.transactionService.calculateTransaction();
    this.onChartChange('Expense');
    this.updateTransactionSummary();
    this.transactionModal();
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.loggedUserTransaction();
    this.transactionService.calculateAnalytics();
  }
}
