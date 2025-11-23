import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  code: string | null = null;
  loading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private service: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');

    console.log('✅ Short code from URL:', this.code);

    if (!this.code) {
      this.showNotFound();
      return;
    }

    // ✅ Call backend to get original URL
    this.service.getLinkByCode(this.code).subscribe({
      next: (res: any) => {
        console.log('✅ API Response:', res);

        // ✅ Backend now returns object, not array
        if (!res || !res.data || !res.data.long_url) {
          this.showNotFound();
          return;
        }

        const originalUrl = res.data.long_url;
        console.log('✅ Redirecting to:', originalUrl);

        // ✅ Redirect user
        window.location.href = originalUrl;
      },
      error: () => {
        this.showNotFound();
      }
    });
  }

  showNotFound() {
    this.loading = false;
    this.notFound = true;
  }
}
