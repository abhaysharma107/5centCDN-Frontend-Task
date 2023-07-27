import { Component } from '@angular/core';
import { PostService } from 'src/app/_services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {

  user:any = {}
  posts:any = []
  constructor(private postService:PostService, private snackbar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user.user.permission.read === true) {
      this.getAllPosts()
    }else{
      this.getPosts(this.user.user._id)
    }
  }

  getPosts(id:string){
    this.postService.getPosts(id).subscribe(res => {
      console.log(res);
      this.posts = res
    })
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(res => {
      console.log(res);
      this.posts = res
    })
  }


  deletePost(id:string, userId:string){
    if (this.user.user.permission.delete !== true && this.user.user._id !== userId) {
      this.snackbar.open('You do not have permission to delete this post', 'close', {duration: 2000})
      return
    }
    this.postService.deletePost(id).subscribe(res => {
      console.log(res);
      this.posts = this.posts.filter((post:any) => post._id !== id)
      this.snackbar.open('Post deleted successfully', 'close', {duration: 2000})
    })
  }

  edit(id:string, userId:string){
    if (this.user.user.permission.update !== true && this.user.user._id !== userId) {
      this.snackbar.open('You do not have permission to edit this post', 'close', {duration: 2000})
      return
    }
    this.router.navigate([`/post/edit-post/${id}`])
  }
}
