import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  title = 'Angular Form Validation Tutorial';
  angForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.angForm = this.fb.group({
       firstname: ['', Validators.required ],
       lastname: ['', Validators.required ],  
       username: ['', Validators.required ],  
       email: ['', Validators.required ],  
       aboutme: ['', Validators.required ]  
    });
  }

  onSubmit(): void { }

}
