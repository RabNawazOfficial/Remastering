import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {
  details: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/api/details').subscribe(data => {
      this.details = data;
    });
  }

}
