import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserStorageService } from '../../../Storage/user-storage.service';
import { TranactionsService } from '../../../Services/tranactions.service';
import { userdetails } from '../../../models/Usermodel';
import { goalDetails } from '../../../models/goalsmodal';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css'
})
export class GoalComponent {
    goalsArray: goalDetails[] =[];
    addGoalPopUp:Boolean = false;
    contributeGoalPopUp:Boolean = false;
    currentBalance!: number;
    goaltarget!: number;
    goalContributed!:number;
    gindex!:number;
    // transactions!: TransactionComponent;

    constructor(private userStorage:UserStorageService, private transactionService: TranactionsService){}
    ngOnInit():void{
      this.currentBalance = this.transactionService.getCurrentBalance();
      this.loadGoals();
      this.transactionService.totalSavings();
    }

   addGoal(){
    this.addGoalPopUp = !this.addGoalPopUp;
    this.currentBalance = this.transactionService.getCurrentBalance();
    this.transactionService.calculateTransaction();
    //this.transactions.ngOnInit();
   } 

   closeContribution(){
    this.contributeGoalPopUp = !this.contributeGoalPopUp;
   }

   addContribution(gindex:number){
    this.contributeGoalPopUp = !this.contributeGoalPopUp;
    this.transactionService.calculateTransaction();
    const CurrentGoal = this.transactionService.getGoalInfo(gindex);
    //console.log(CurrentGoal.gamount);
    this.currentBalance = this.transactionService.getCurrentBalance();
    this.goaltarget = CurrentGoal.gamount;
    this.goalContributed = CurrentGoal.camount;
    this.gindex=gindex;
    
   }

   onGoalSubmit(form:NgForm){
    console.log(form);
    this.transactionService.addGoals(form);
    this.loadGoals();
    this.addGoal();
    this.transactionService.calculateTransaction();
   }

   onContributionSubmit(form: NgForm){
    console.log('contribution submitted');
    console.log(form);
    console.log(this.gindex);
    this.transactionService.UpdateContribution(form, this.gindex);
    this.loadGoals();
    this.closeContribution();
   }

   isContributionValid(gfcontribution: string, gfamount: string): boolean {
    const contribution = Number(gfcontribution);
    const amount = Number(gfamount);
    return contribution > amount;
  }

  loadGoals(){
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    this.goalsArray = userArray[index].goals;
    this.transactionService.calculateTransaction();
  }

  goalContributionCheck(goalContribute:string):Boolean{
    if((Number(goalContribute) + this.goalContributed) > this.goaltarget){
      return true;
    }
    return false;
  }

  contributionGreater(goalContribute:string){
    if(Number(goalContribute) > this.currentBalance){
      return true;
    }
    return false;
  }
   
}
