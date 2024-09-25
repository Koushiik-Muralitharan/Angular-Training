import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherServiceService } from './weather-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  city: string = '';
  weatherData: any = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private weatherService: WeatherServiceService) {}

  searchCity() {
    if (!this.city) {
      this.errorMessage = 'Please enter a city name to search.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.weatherService.getWeatherData(this.city).subscribe({
      next: (data:any) => {
        this.weatherData = data;
        console.log(data);
        this.isLoading = false;
      },
      error: (err:any) => {
        console.log(err);
        this.errorMessage = 'Please enter a valid city name.';
        this.isLoading = false;
      }
    });
  }
}
