import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public inputEmail: string;
  public inputPassword: string;
  errorFetch: boolean = false;
  constructor(private router: Router) {
    this.inputEmail = "";
    this.inputPassword = "";
  }
  signUp() {
    if (this.inputEmail == "" || this.inputPassword == "") {
      console.log('sssss')
      this.errorFetch = true;
    }
    switch (true) {
      case (this.inputEmail == "administrador@correo.com" && this.inputPassword == "1234"):
        this.router.navigate(['/administrator'])
        break;
      case (this.inputEmail == "supervisor@correo.com" && this.inputPassword == "1234"):
        this.router.navigate(['/supervisor'])
        break;
      case (/^\d{5,10}@correo\.com$/.test(this.inputEmail) && this.inputPassword === "1234"):
        console.log(this.inputEmail)
        const inputEmail = this.inputEmail;
        const extractedNumbers = inputEmail.match(/\d+/);
        const numbers = extractedNumbers ? extractedNumbers[0] : null;
        this.router.navigate(['/driver'], { queryParams: { identification: numbers } })
        break;
    }
  }

}
