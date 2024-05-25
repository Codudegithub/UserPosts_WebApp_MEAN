import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']  // Corrected the key to styleUrls
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];  // Initialized as an empty array
  private postsSub: Subscription;

  constructor(public postservice: PostsService) {}

  ngOnInit() {
    this.postservice.getPosts();
    this.postsSub = this.postservice.getPostUpdateListener()
      .subscribe({
        next: (posts: Post[]) => {
          this.posts = posts;
        }
      });
  }

  onDelete(postId: string) {
    this.postservice.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
