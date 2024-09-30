import { Component } from '@angular/core';
import { Chart, PieController, ArcElement, Legend, Tooltip, Title, } from "chart.js";
import { TranactionsService } from '../../../../Services/tranactions.service';
import { UserStorageService } from '../../../../Storage/user-storage.service';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  constructor(private transactionService: TranactionsService, private userStorage: UserStorageService){

  }
  ngAfterViewInit() {
    const userArray = this.userStorage.getUser();
    const index = this.transactionService.getLoggedUserIndex();
    const income = userArray[index].income;
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    Chart.register(PieController, ArcElement, Title, Legend, Tooltip);
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = {
          labels: ["Food", "Transport", "Shopping", "Entertainment"],
          datasets: [
            {
              backgroundColor: ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9"],
              data: [(this.transactionService.calculateAnalytics().foodCost/income)*100, , , ],
            },
          ],
        };

        const config:any = {
          type: "pie" as const,
          data: data,
          options: {
            plugins: {
              title: {
                display: true,
                text: "Expense Statistics",
              },
              legend: {
                display: true,
                position: "top",
              },
            },
          },
        };
        new Chart(ctx, config);
      }
    }
  }
}
