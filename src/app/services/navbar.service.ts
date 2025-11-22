import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enivronments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get(`${environment.apiUrl}/stats`);
  }

  getHealth() {
    return this.http.get(`${environment.apiUrl}/health`);
  }
}
