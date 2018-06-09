import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() posts: Post[];
  postSubscribe : Subscription;

  constructor(private postService: PostService,
  			  private route: ActivatedRoute) {
   }

  ngOnInit() {
  	this.postSubscribe = this.postService.postsSubject.subscribe(
  		(posts: Post[]) => {
  			this.posts = posts;
  		});
  	this.postService.emitPosts();
  }

  ngOnDestroy() {
  	this.postSubscribe.unsubscribe();
  }

}
