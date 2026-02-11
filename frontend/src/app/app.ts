import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { environment } from '../../environments/environment';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular_client');

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.http.get(`${environment.apiUrl}/territories`).subscribe({
      next: (res) => console.log('backend Ok:', res),
      error: (err) => console.error('Error backend', err),
    });
  }


}
