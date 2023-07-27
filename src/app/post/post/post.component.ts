import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{

  superAdmin:boolean = false
  constructor(){}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}').user
    if (user.role === 'superAdmin') {
      this.superAdmin = true
    }
  }

}