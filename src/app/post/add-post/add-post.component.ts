import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/_services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent  implements OnInit{

  postForm = new FormGroup({
    title: new FormControl(''),
  })

  editing:boolean = false

  user = JSON.parse(localStorage.getItem('user') || '{}').user

  constructor(private postService:PostService, private snackbar:MatSnackBar, private router:Router){}

  ngOnInit(): void {
    //check if router url contains edit-post
    if(this.router.url.includes('edit-post')){
      this.editing=true;
      const postId = this.router.url.split('/').at(-1) as string
      this.postService.getPost(postId).subscribe(res => {
        console.log(res);
        this.postForm.setValue({title: res.title})
      }
      )
    }
  }

  onSubmit(){
    console.log(this.user);
    if(this.editing){
      this.editPost()
    } else{
    this.postService.addPost(this.postForm.value.title, this.user._id).subscribe(res => {
      console.log(res);
      this.snackbar.open('Post added successfully', 'close', {duration: 2000})
      this.router.navigate(['/post/view-post'])
    })
  }
  }

  editPost(){
    const postId = this.router.url.split('/').at(-1) as string
    this.postService.updatePost(this.postForm.value.title, postId).subscribe(res => {
      console.log(res);
      this.snackbar.open('Post updated successfully', 'close', {duration: 2000})
    })
  }
}
