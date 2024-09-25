import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderDetails } from '../../Modals/order-details';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent {

  @Output() SelectedCancel = new EventEmitter<string>();

  @Input() clicks:string = '';

  orderInfo: OrderDetails[] =[{
      id: "#2632",
      username:"Brooklyn Zoe",
      payment: "Cash",
      time:"13 min",
      type:"Delivery",
      status:"On the way",
      total:"£12.00",
      action:"fa-solid fa-ellipsis-vertical" ,
      images:"./assets/images/f1.jpg" 
    },
  {
    id: "#2633",
    username:" Alice Krejcova",
    payment: "Paid",
    time:"49 min",
    type:"Collection",
    status:"Ready",
    total:"£14.00",
    action:"fa-solid fa-ellipsis-vertical",
    images:"./assets/images/f2.jpg" 
  },
  {
    id: "#2634",
    username:"Jurriaan van",
    payment: "Cash",
    time:"07 min",
    type:"Delivery",
    status:"On the way",
    total:"£18.00",
    action:"fa-solid fa-ellipsis-vertical",
    images:"./assets/images/m2.jpg"   
  },
  {
    id: "#2635",
    username:"Ya Chin-Ho",
    payment: "Paid",
    time:"49 min",
    type:"Collection",
    status:"Ready",
    total:"£26.00",
    action:"fa-solid fa-ellipsis-vertical",
    images:"./assets/images/m3.jpg"   
  },
  {
    id: "#2636",
    username:"Shaamikh AI",
    payment: "Cash",
    time:"13 min",
    type:"Delivery",
    status:"On the way",
    total:"£08.00",
    action:"fa-solid fa-ellipsis-vertical",
    images:"./assets/images/m1.jpg"   
  }]

  informParent(index:number){
    this.SelectedCancel.emit('Canceled');
    console.log("hi:"+this.clicks+"\n"+"index :"+index);
    this.orderInfo[index].type = this.clicks;
  }
}
