import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'InventoryApp';
  userArray: User[] = [];
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';
  userExists: boolean = true;
  userEditIndex: number | null = null;
  nameError: string = '';
  emailError: string = '';
  roleError: string = '';
  constructor() {}

  checkifUserExists(usersemail: string) {
    return this.userArray.some((user) => user.email === usersemail);
  }

  addUser() {
    this.userExists = true;
    if (this.userName.trim() === '') {
      this.nameError = 'fill the name field.';
    }
    if (this.userEmail.trim() === '') {
      this.emailError = 'fill the email field.';
    }
    if (this.userRole === '') {
      this.roleError = 'select the role.';
    }
    if (this.userName !== '' && this.userEmail !== '' && this.userRole !== '') {
      if (!this.checkifUserExists(this.userEmail)) {
        const newUser: User = {
          name: this.userName,
          email: this.userEmail,
          role: this.userRole,
        };
        this.userArray.push(newUser);
        console.log(this.userArray);
        this.userName = '';
        this.userEmail = '';
        this.userRole = '';
        this.emailError = '';
        this.nameError = '';
        this.roleError = '';
      } else {
        console.log('user already exists...');
        this.userExists = this.checkifUserExists(this.userName);
      }
    }
  }

  deleteUser(index: number) {
    this.userArray.splice(index, 1);
  }
  editUser(index: number) {
    const findUser = this.userArray[index];
    this.userName = findUser.name;
    this.userEmail = findUser.email;
    this.userRole = findUser.role;
    this.userEditIndex = index;
  }
  onUpdate() {
    if (this.userEditIndex !== null) {
      if (this.userName.trim() === '') {
        this.nameError = 'fill the name field.';
      }
      if (this.userEmail.trim() === '') {
        this.emailError = 'fill the email field.';
      }
      if (this.userRole === '') {
        this.roleError = 'select the role.';
      }
      if (
        this.userName !== '' &&
        this.userEmail !== '' &&
        this.userRole !== ''
      ) {
        const editedUser: User = {
          name: this.userName,
          email: this.userEmail,
          role: this.userRole,
        };
        this.userArray[this.userEditIndex] = editedUser;

        this.userName = '';
        this.userEmail = '';
        this.userEditIndex = null;
        this.userRole = '';
        this.emailError = '';
        this.nameError = '';
        this.roleError = '';
      }
    }
  }
}
