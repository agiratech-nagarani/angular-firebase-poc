import { Injectable } from '@angular/core';
import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  downloadURL: Observable<string>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private router: Router,
    private storage: AngularFireStorage) { }

    uploadImage(event){
      console.log('ecmedsd', event);
      const file = event.target.files[0];
      const filePath = 'userDetailImages/' + event.target.files[0].name;
      const fileRef = this.storage.ref(filePath);
      fileRef.getDownloadURL().subscribe(dl => {
        this.downloadURL = dl;
        console.log(';asdasd', dl);
        return this.downloadURL;
      });
      console.log(this.downloadURL, 'download url');
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(dl => {
            this.downloadURL = dl;
            return this.downloadURL;
          });
          console.log('download url', this.downloadURL);
        })).subscribe();
      return this.downloadURL;
    }
    emailSignUp(form) {
      return this.afAuth.auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(credential => {
          console.log('Welcome new user!', 'success');
          return this.updateUserData(form); // if using firestore
        })
        .catch(error => this.handleError(error));
    }
  
    signOut() {
      this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
      });
    }

    emailLogin(form) {
      return this.afAuth.auth
        .signInWithEmailAndPassword(form.email, form.password)
        .then(credential => {
        this.router.navigate(['/']);          
          console.log('Welcome back!', 'success');
          return this.updateUserData(credential.user);
        })
        .catch(error => this.handleError(error));
    }

    private updateUserData(user: User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
  
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || 'nameless user',
        photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
      };
      return userRef.set(data);
    }


  
    // If error, console log and notify user
    private handleError(error: Error) {
      console.error(error);
      console.log(error.message, 'error');
    }
}
