import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string){
    return this.http.post<any>(`${environment.url}/login`, {email, password});
  }

  signup(name:string, email:string, password:string, role:string, permission:object){
    return this.http.post<any>(`${environment.url}/signup`, {name, email, password, role, permission});
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  userData(){
    // console.log(localStorage.getItem('token'));
    
    return this.http.get<any>(`${environment.url}/userProfile`, {
      headers: new HttpHeaders({
        'authorization': 'Bearer '+ localStorage.getItem('token'),
      })
    })
    .pipe(
      map((res) => {
        // console.log(res);
        return res
      })
    )
  }

  getAdmins(){
    return this.http.get<any>(`${environment.url}/getAdmin`, {
  })  
  }

  deleteAdmin(id:string){
    return this.http.delete<any>(`${environment.url}/deleteUser/${id}`, {
  })  
  }

  editAdmin(id:string, name:string, email:string, password:string, role:string, permission:object){
    return this.http.put<any>(`${environment.url}/updateUser/${id}`, {name, email, password, role, permission}, {
  })  
  }
  
}
