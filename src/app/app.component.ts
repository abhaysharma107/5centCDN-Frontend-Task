import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'auth-frontend';
  login = false;

  constructor(private authService:AuthService, private snackbar:MatSnackBar){}

  ngOnInit(){
    const token = localStorage.getItem('token');
    if(token){
      this.login = true;
    }
  }

  logout(){
    this.authService.logout();
    this.login = false;
    this.snackbar.open('Logout Successfully', 'close', {duration: 2000})
  }
}
