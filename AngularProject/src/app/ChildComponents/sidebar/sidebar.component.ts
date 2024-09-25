import { Component } from '@angular/core';
import { SidebarElements } from '../../Modals/sidebar-elements';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarContents: SidebarElements[] = [{
    icon: "fa-solid fa-box",
    element:"Live Orders"
  },{
    icon: "fa-solid fa-suitcase",
    element:"Order History"
  },{
    icon: "fa-solid fa-tag",
    element:"Offers"
  },{
    icon: "fa-solid fa-cube",
    element:"Products"
  },{
    icon: "fa-solid fa-layer-group",
    element:"Stock"
  },{
    icon: "fa-solid fa-comments",
    element:"Message"
  },{
    icon: "fa-solid fa-gear",
    element:"Settings"
  }]
}
