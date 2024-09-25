import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  private API_KEY = '7d3bf8ad01e8bf2375ca7989b24980c2';
  private URL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  // Method to fetch weather data
  getWeatherData(city: string): Observable<any> {
    const fullUrl = `${this.URL}?q=${city}&appid=${this.API_KEY}&units=metric`;
    return this.http.get<any>(fullUrl);
  }
}
