import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private fbAuth: AngularFireAuth) { }

  googleLogin() {
    this.fbAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

}
