import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [FormsModule, AppComponent, CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {
  @Input() name!: string;
  @Output() notify = new EventEmitter<string>();
  
  sendNotification() {
    this.notify.emit('The child component says hello!');
  }

}
