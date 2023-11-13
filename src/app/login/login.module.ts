import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule
  ]
})
export class LoginModule { }
