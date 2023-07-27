import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostComponent } from './post/post/post.component';
import { AddAdminComponent } from './auth/add-admin/add-admin.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  {path: 'add-admin', component: AddAdminComponent},
  {path: 'post', component: PostComponent,},
    {path:'post/add-post', component: AddPostComponent},
    {path:'post/edit-post/:id', component: AddPostComponent},
    {path:'post/view-post', component: ViewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
