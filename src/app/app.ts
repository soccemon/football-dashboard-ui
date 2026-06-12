import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { timer, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  readonly backendReady = signal(false);

  ngOnInit() {
    this.checkBackend();
  }

  private checkBackend() {
    this.http.get(`${environment.apiUrl}/`).pipe(
      map(() => true),
      // Any HTTP response (even 404) means the server is up
      catchError(err => of(err.status > 0))
    ).subscribe(up => {
      if (up) {
        this.backendReady.set(true);
      } else {
        timer(5000).subscribe(() => this.checkBackend());
      }
    });
  }
}
