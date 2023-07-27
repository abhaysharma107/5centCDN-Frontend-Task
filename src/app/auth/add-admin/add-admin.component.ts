import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  admins:any = [];
  editing = false;
  id:string = '';

  signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('admin'),
    create: new FormControl(false),
    read: new FormControl(false),
    update: new FormControl(false),
    delete: new FormControl(false),
  })

  constructor(private authService:AuthService, private router:Router, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.user.role !== 'superAdmin'){
      this.router.navigate(['/post']);
    }
    this.getAdmins()
  }

  onSubmit(id?:string) {
    console.log(this.signupForm.value);
    const name = this.signupForm.value.name || '';
    const email = this.signupForm.value.email || '';
    const password = this.signupForm.value.password || '';
    const role = this.signupForm.value.role || '';
    const create = this.signupForm.value.create || false;
    const read = this.signupForm.value.read || false;
    const update = this.signupForm.value.update || false;
    const deletePermission = this.signupForm.value.delete || false;
    const permission = {
      create:create,
      read:read,
      update:update,
      delete: deletePermission
    }
    if (this.editing ) {
      this.authService.editAdmin(this.id, name, email, password, role, permission).subscribe(res => {
        console.log(res);
        this.snackbar.open('Admin Edited Successfully', 'close', {duration: 2000})
        this.getAdmins()
      })
      this.editing = false;
      this.id = '';
      this.signupForm.reset();
    }else{
    this.authService.signup(name, email, password, role, permission).subscribe(res => {
      console.log(res);
      this.snackbar.open('Admin Added Successfully', 'close', {duration: 2000})
      this.getAdmins()
    })
  }
  }

  getAdmins() {
    this.authService.getAdmins().subscribe(res => {
      console.log(res);
      this.admins = res.user;
    })
  }
  edit(id:string){
    this.editing=true;
    this.id=id;
    this.signupForm.patchValue({
      name: this.admins.find((admin:any) => admin._id === id).name,
      email: this.admins.find((admin:any) => admin._id === id).email,
      role: this.admins.find((admin:any) => admin._id === id).role,
      create: this.admins.find((admin:any) => admin._id === id).permission.create,
      read: this.admins.find((admin:any) => admin._id === id).permission.read,
      update: this.admins.find((admin:any) => admin._id === id).permission.update,
      delete: this.admins.find((admin:any) => admin._id === id).permission.delete,
    })
  }
  deleteAdmin(id:string){
    this.authService.deleteAdmin(id).subscribe(res => {
      console.log(res);
      this.snackbar.open('Admin Deleted Successfully', 'close', {duration: 2000})
      this.getAdmins()
    })
  }
}
