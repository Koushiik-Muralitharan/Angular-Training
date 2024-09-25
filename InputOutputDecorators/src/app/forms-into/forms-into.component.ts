import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms-into',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forms-into.component.html',
  styleUrl: './forms-into.component.css'
})
export class FormsIntoComponent implements OnInit  {
  countryList : Country[]=[
    new Country ('1', "USA"),
    new Country ('2', "India"),
    new Country ('3', "Russia"),
  ]

  contact!: Contact;
  ngOnInit(): void {
    this.contact = {
      firstName:'koushiik',
      age:'21',
      phone:'9047615315',
      country:'2',
      address:{
        city:'Coimbatore',
        street:'bond street'
      }

    }
  }

  onSubmit(form:NgForm){
    console.log(form);
  }
}
class Country{
  id:string='';
  country:string='';

  constructor(id:string, country:string){
    this.id = id;
    this.country = country;
  }
}

class Contact{
  firstName!:string;
  age!:string;
  phone!:string;
  country!:string;
  address!:{
    city:string;
    street:string;
  }
}