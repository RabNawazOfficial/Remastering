import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-name-form',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './name-form.html',
  styleUrl: './name-form.css'
})
export class NameForm {
  formData = { firstName: '', middleName: '', lastName: '' };
  nameForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    lastName: new FormControl('', Validators.required)
  });
  form!: FormGroup;
  countries: string[] = [];
  states: string[] = [];



  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      address: [''],
      pincode: [''],
      color: [''],
      hobbies: this.fb.group({
        reading: [false],
        traveling: [false],
        gaming: [false],
      }),
      profilePic: [null],
      experience: [''],
      joiningDate: [''],
      comments: ['']
    });

    this.http.get<string[]>('http://localhost:5001/api/countries').subscribe(data => {
      console.log(data, "country data");

      this.countries = data;
    });

    this.http.get<string[]>('http://localhost:5001/api/states').subscribe(data => {
      console.log(data, "state data");

      this.states = data;
    });


  }


  submitForm() {
    const formData = new FormData();

    // Append simple fields
    Object.entries(this.form.value).forEach(([key, value]) => {
      if (key !== 'hobbies' && value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Append hobbies (nested group)
    Object.entries(this.form.value.hobbies).forEach(([key, value]) => {
      formData.append(`hobbies_${key}`, String(value));
    });

    // Append file
    const fileInput = this.form.get('profilePic')?.value;
    if (fileInput instanceof File) {
      formData.append('profilePic', fileInput);
    }

    this.http.post('http://localhost:5000/api/submit', formData).subscribe(() => {
      this.router.navigate(['/details']);
    });
  }


}
