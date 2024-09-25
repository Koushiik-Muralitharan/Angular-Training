import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './ChildComponents/sidebar/sidebar.component';
import { NavbarComponent } from './ChildComponents/navbar/navbar.component';
import { LiveOrdersComponent } from './ChildComponents/live-orders/live-orders.component';
import { OrdersComponent } from './ChildComponents/orders/orders.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent, LiveOrdersComponent, OrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularProject';
  clicked:string='Canceled';
  
  onSelected(type: string){
    this.clicked= type;
  }
}
