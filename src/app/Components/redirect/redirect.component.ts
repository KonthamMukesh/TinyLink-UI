import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  code: string | null = null;
  loading = true;
  notFound = false;
  currentPath = window.location.pathname;

  constructor(
    private route: ActivatedRoute,
    private service: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');

    if (!this.code || this.code === 'undefined') {
      this.showNotFound();
      return;
    }

    // ✅ Call backend JSON API (not redirect URL)
    this.service.getLinkByCode(this.code).subscribe({
      next: (res: any) => {
        if (!res || !res.long_url) {
          this.showNotFound();
          return;
        }

        // ✅ Valid → Redirect to actual long URL
        window.location.href = res.long_url;
      },
      error: () => this.showNotFound()
    });
  }

  showNotFound() {
    this.loading = false;
    this.notFound = true;
  }
}
