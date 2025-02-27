import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Post } from "./post.model";


@Injectable({providedIn: 'root'})  //single instance is created across the app
export class PostsService{
    private posts: Post[]=[];

    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient){}

    getPosts(){
        this.http.get<{message: string, posts: any}>('http://localhost:3000/posts')
        .pipe(map((postData)=>{
            return postData.posts.map(post=>{
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
        .subscribe((transformedposts)=>{
            this.posts=transformedposts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string){
        const post: Post = {id: null, title: title, content: content};
        this.http.post<{message: string, postID: any}>('http://localhost:3000/posts', post)
        .subscribe((responseData)=>{
            post.id=responseData.postID;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        }); 
    }

    deletePost(postId: string){
        this.http.delete('http://localhost:3000/posts/'+postId)
        .subscribe(()=>{
            console.log('Deleted');
            this.posts=this.posts.filter(post=> post.id!==postId);
            this.postsUpdated.next([...this.posts]);
        });
    }
} 
