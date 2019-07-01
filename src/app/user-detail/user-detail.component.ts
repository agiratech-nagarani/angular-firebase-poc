import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  userDetail: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.userDetail = this.formBuilder.group({
      name: ['', Validators.required],
      imageURL: ['', Validators.required],
      isUsed: [false]
    });
  }

  createUserDetail(userInfo){
    console.log('user info', userInfo);
  }

  uploadFile(event){
    console.log(event, 'event');
    console.log(this.authService.uploadImage(event), 'urllll');
    
  }
}
