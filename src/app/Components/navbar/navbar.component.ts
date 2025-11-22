import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink,RouterLinkActive]
})
export class NavbarComponent {

  healthStatus: string = 'Checking...';
totalLinks: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    
  }


  // 👤 Go to Profile
  goToProfile() {
    this.router.navigate(['/profile']);
  }

  // 🔐 Logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
