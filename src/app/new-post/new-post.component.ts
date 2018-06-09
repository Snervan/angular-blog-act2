import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PostService } from '../services/post.service';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
  			  private postService: PostService,
  			  private router: Router,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
  	this.initForm();
  }

  initForm() {
  	this.postForm = this.formBuilder.group({
  		title: ['', Validators.required],
  		content: ['', Validators.required]
  	});
  }

  onSubmitForm() {
  	const formValue = this.postForm.value;

  	this.postService.createNewPost(formValue['title'], formValue['content']);
  	this.postService.emitPosts();

  	this.router.navigate(['/posts']);
  }

}
