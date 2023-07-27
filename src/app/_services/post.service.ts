import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getPosts(userId:string) {
    return this.http.post<any>(`${environment.url}/get-post`, {userId});
  }
  getAllPosts() {
    return this.http.get<any>(`${environment.url}/get-all-post`);
  }

  getPost(postId:string) {
    return this.http.get<any>(`${environment.url}/get-post-by-id/${postId}`);
  }

  addPost(title:any, userId:string) {
    return this.http.post<any>(`${environment.url}/add-post`, {title, userId});
  }

  deletePost(postId:string) {
    return this.http.delete<any>(`${environment.url}/delete-post/${postId}`);
  }

  updatePost(title:any, postId:string) {
    return this.http.put<any>(`${environment.url}/update-post`, {title, postId});
  }
}
