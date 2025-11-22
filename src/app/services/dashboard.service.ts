import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enivronments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  // ✅ Get token like your other project
  token: string = localStorage.getItem('token') || '';

  private getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  private baseUrl = environment.apiUrl;

  // -------------------------
  // 🔗 Short Links APIs
  // -------------------------

  createShortLink(data: any) {
    return this.http.post(
      `${this.baseUrl}/api/links`,
      data,
      { headers: this.getHeaders() }
    );
  }
redirectAndTrack(code: string) {
  return this.http.get(`${environment.apiUrl}/api/r/${code}`);
}



  getAllLinks() {
    return this.http.get(
      `${this.baseUrl}/api/links`,
      { headers: this.getHeaders() }
    );
  }


 getLinkByCode(code: string) {
  return this.http.get(`${environment.apiUrl}/api/links/${code}`);
}

  deleteLink(id: any) {
    return this.http.delete(
      `${this.baseUrl}/api/links/${id}`,
      { headers: this.getHeaders() }
    );
  }

updateShortCode(code: string, body: any) {
  return this.http.put(`${this.baseUrl}/api/links/${code}`, body);
}


  // -------------------------
  // 📊 Stats API
  // -------------------------

  getStats() {
    return this.http.get(
      `${this.baseUrl}/api/stats`,
      { headers: this.getHeaders() }
    );
  }

  // -------------------------
  // 🩺 Health API
  // -------------------------

  checkHealth() {
    return this.http.get(
      `${this.baseUrl}/api/healthz`,
      { headers: this.getHeaders() }
    );
  }
}
