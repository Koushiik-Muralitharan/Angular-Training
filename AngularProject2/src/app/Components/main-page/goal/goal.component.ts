import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserStorageService } from '../../../Storage/user-storage.service';
import { TranactionsService } from '../../../Services/tranactions.service';
import { userdetails } from '../../../models/Usermodel';
@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css'
})
export class GoalComponent {
    addGoalPopUp:Boolean = false;
    currentBalance!: number;

    constructor(private userStorage:UserStorageService, private transactionService: TranactionsService){}
    ngOnInit():void{
      this.currentBalance = this.transactionService.getCurrentBalance();
    }

   addGoal(){
    this.addGoalPopUp = !this.addGoalPopUp;
    this.currentBalance = this.transactionService.getCurrentBalance();
   } 

   onGoalSubmit(form:NgForm){
    console.log(form);
   }

   isContributionValid(gfcontribution: string, gfamount: string): boolean {
    const contribution = Number(gfcontribution);
    const amount = Number(gfamount);
    return contribution > amount;
  }
   
}
