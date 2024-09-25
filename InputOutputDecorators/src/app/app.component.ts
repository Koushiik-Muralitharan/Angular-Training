import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { CommonModule } from '@angular/common';
import { FormsIntoComponent } from './forms-into/forms-into.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChildComponent,CommonModule, FormsIntoComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  headings:string = 'InputOutputDecorators';
  messageFromChild!:string ;

  onNotify(message: string) {
    this.messageFromChild = message;
  }

}
