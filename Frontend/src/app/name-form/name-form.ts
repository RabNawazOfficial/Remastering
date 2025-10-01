import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-name-form',
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule],
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



  constructor(private http: HttpClient, private router: Router) { }

  submitForm() {
    this.http.post('http://localhost:5000/api/submit', this.nameForm.value).subscribe(() => {
      this.router.navigate(['/details']);
    });
  }


}
