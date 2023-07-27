import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('user'),
    permission: new FormControl({
      create: false,
      read: false,
      update: false,
      delete: false
    }),
  })

  constructor(private authService:AuthService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signupForm.value);
    const name = this.signupForm.value.name || '';
    const email = this.signupForm.value.email || '';
    const password = this.signupForm.value.password || '';
    const role = this.signupForm.value.role || '';
    const permission = this.signupForm.value.permission || { create: false, read: false, update: false, delete: false };
    this.authService.signup(name, email, password, role, permission).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.authService.userData().subscribe(res => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
        this.snackbar.open('Signup Successfully', 'close', {duration: 2000})
        this.router.navigate(['/post']);
      })
    })
  }
}
