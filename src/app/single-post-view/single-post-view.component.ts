import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../services/post.service';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-single-post-view',
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.css']
})
export class SinglePostViewComponent implements OnInit {
	
  post: Post;
  postSubscribe: Subscription;
  id : number;

  constructor(private postService: PostService,
  			  private route: ActivatedRoute,
  			  private router: Router) 
  {
  	this.id = Number(this.route.snapshot.params['id']);
  }

  ngOnInit() {
  	this.postSubscribe = this.postService.postsSubject.subscribe(
  		() => {
	  			this.postService.getSinglePost(+this.id).then(
		  		(post: Post) => {
		  			this.post = post;
		  		} );
  		});

  	this.postService.emitPosts();
  }

  deletePost() {

    if(confirm('Voulez-vous supprimer le post ?')) {
      this.postService.removePost(this.id);
      this.router.navigate(['/posts']);
    } else {
      return null;
    }

  }

  loveItPlus() {
    this.postService.setLovePlus(this.id);
    this.postService.emitPosts();
  }

  loveItLess() {
    this.postService.setLoveLess(this.id);
    this.postService.emitPosts();
  }

  ngOnDestroy() {
  	this.postSubscribe.unsubscribe();
  }

}
