import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from '../services/post.service';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input() index: number;
  @Input() postTitle : string;
  @Input() postContent: string;
  @Input() postLike: number;
  @Input() postDate: number;


  constructor(private postService: PostService, private route: Router) { }

  ngOnInit() {
  }

  deletePost() {
    this.postService.removePost(this.index);
  }

  loveItPlus() {
    this.postService.setLovePlus(this.index);
  }

  loveItLess() {
    this.postService.setLoveLess(this.index);
  }

  onViewArticle() {
    this.route.navigate(['posts', 'view' , this.index]);
  }

}
