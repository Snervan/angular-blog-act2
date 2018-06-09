import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

import { Post } from '../models/post.model';

@Injectable()
export class PostService {

  posts: Post[];
  postsSubject = new Subject<Post[]>();

  constructor() {
  	this.getPosts(); 
  }

  emitPosts() {
  	this.postsSubject.next(this.posts);
  }

  getPosts() {
  	firebase.database().ref('/Posts').on(
  		'value', (data) => {
  			this.posts = data.val() ? data.val() : [];
  			this.emitPosts();
  		});
  	console.log('Données chargées depuis back-end Firebase');
  }

  getSinglePost(id: number) {
  	return new Promise(
  		(resolve, reject) => {
  			firebase.database().ref('/Posts/' + id).once('value').then(
  				(data) => {
  					resolve(data.val());
  				}, (error) => {
  					reject(error);
  				});
  		});
  }

  createNewPost(title: string, content: string) {
  	var nextId;

  	if (Number(this.posts.length) === 0) {
  		nextId = 1;
  	} else {
  		 nextId = (this.posts[(this.posts.length) - 1].id) + 1;
  	}
  	
  	const nowDate = Date.now();

  	const newPost = new Post(
  		nextId,
  		title,
  		content,
  		0,
  		nowDate);

  	this.posts.push(newPost);

  	firebase.database().ref('/Posts/').set(this.posts).then(
  		()=> {
  			this.emitPosts();
  		});
  }

  setLovePlus(id: number) {
  	this.posts[id].loveIts++;
  	firebase.database().ref('/Posts/'+ id).update(this.posts[id]);
  	this.emitPosts();
  }

  setLoveLess(id: number) {
  	this.posts[id].loveIts--;
  	firebase.database().ref('/Posts/'+ id).update(this.posts[id]);
  	this.emitPosts();
  }

  removePost(id: number) {

  	const postToRemove = this.posts.findIndex(
	  			(postElement) => {
		  			if(postElement === this.posts[id]) {
		  				return true;
		  			}
	  			});
  	this.posts.splice(postToRemove, 1);

	firebase.database().ref('/Posts').set(this.posts).then(
		() => {
			this.emitPosts();
		});
  }
}
