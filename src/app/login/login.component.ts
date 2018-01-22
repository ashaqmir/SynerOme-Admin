import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public password: string;
  public email: string;
  rememberMe = true;
  constructor(private router: Router,
    public auth: AuthService) { }

  ngOnInit() {
    const umail = localStorage.getItem('admin-usr-mail');
    const pwd = localStorage.getItem('admin-usr-pwd');

    if (umail) {
      this.email = umail;
    }
    if (pwd) {
      this.password = pwd;
    }
  }

  private login() {
    console.log('Login Clicked!');
    this.auth.emailLogin(this.email, this.password)
      .then(data => {
        this.afterSignIn();
      });
  }

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    if (this.rememberMe) {
      localStorage.setItem('admin-usr-mail', this.email);
      localStorage.setItem('admin-usr-pwd', this.password);
    } else {
      localStorage.removeItem('admin-usr-mail');
      localStorage.removeItem('admin-usr-pwd');
    }
    this.router.navigate(['/dashboard']);
  }
}
