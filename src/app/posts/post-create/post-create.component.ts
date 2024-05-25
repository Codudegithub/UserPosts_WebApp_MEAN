import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
 
 constructor(public postsservice : PostsService){};

  onAddPost(frm: NgForm ) {
    if(frm.invalid){
      return;
    }
    this.postsservice.addPost(frm.value.title,frm.value.content);
    frm.resetForm();
    }
  }

 