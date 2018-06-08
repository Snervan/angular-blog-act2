import { Component } from '@angular/core';
import * as firebase from 'firebase';

import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  	const config = {
	  	apiKey: "AIzaSyBVf_wzN5nL3bMInlwFJ7rCKXwvvRdpW9A",
	    authDomain: "blog-demo-1c6df.firebaseapp.com",
	    databaseURL: "https://blog-demo-1c6df.firebaseio.com",
	    projectId: "blog-demo-1c6df",
	    storageBucket: "",
	    messagingSenderId: "449442613706"
  	};
  	firebase.initializeApp(config);
  }
}
