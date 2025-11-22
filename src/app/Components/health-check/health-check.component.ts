import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css']
})
export class HealthCheckComponent implements OnInit {

  status = '';
  dbStatus = '';
  uptime = '';

  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.checkHealth();
  }

  checkHealth() {
    this.dashboardService.checkHealth().subscribe({
      next: (res: any) => {
        this.status = res.status;
        this.dbStatus = res.database;
        this.uptime = `⏱️ Uptime: ${res.uptime}`;
        this.loading = false;
      },
      error: () => {
        this.status = '❌ Server Down';
        this.dbStatus = '❌ Database Offline';
        this.uptime = 'Uptime unavailable';
        this.loading = false;
      }
    });
  }
}
