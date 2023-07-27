import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private authService:AuthService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';
    this.authService.login(email, password).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.authService.userData().subscribe(res => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        this.snackbar.open('Login Successfully', 'close', {duration: 2000})
        this.router.navigate(['/post']);
      })
    })
  }

}
