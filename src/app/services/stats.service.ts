import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enivronments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = environment.apiUrl + '/api';

  constructor(private http: HttpClient) {}

 
  // ✅ Get all links
  getAllLinks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/links`, this.getHeaders());
  }

  // ✅ Get link by code (for stats or redirect)
  getLinkByCode(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/links/${code}`, this.getHeaders());
  }

  // ✅ Delete link using code or id
  deleteLink(idOrCode: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/links/${idOrCode}`, this.getHeaders());
  }

  // ✅ Update short code (Edit Short URL)
  updateShortCode(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/links/${id}`, data, this.getHeaders());
  }

  // ✅ Update active/inactive status
  updateStatus(id: number, isActive: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/links/status/${id}`, {
      is_active: isActive
    }, this.getHeaders());
  }

  // ✅ Health check
//   checkHealth(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/healthz`);
//   }

  // ✅ Headers helper
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
