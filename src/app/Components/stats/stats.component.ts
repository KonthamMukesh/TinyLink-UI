import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardService } from '../../services/dashboard.service';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  links: any[] = [];
  selectedLink: any = null;

  loading = true;
  error = '';
  successMessage = '';

  constructor(private statsservice:StatsService) {}

  ngOnInit() {
    this.loadLinks();
  }

  // ✅ Load all links
  loadLinks() {
    this.statsservice.getAllLinks().subscribe({
      next: (res: any) => {
        console.log('✅ Links from backend:', res);
        this.links = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = 'Failed to load data';
        this.loading = false;
      }
    });
  }

  // ✅ View full details
  viewDetails(link: any) {
    this.selectedLink = link;
  }

  // ✅ Close popup
  closeDetails() {
    this.selectedLink = null;
  }



  // ✅ Edit Short Code
  editCode(link: any) {
    const newCode = prompt('Edit Short Code', link.code);
    if (!newCode) return;

    this.statsservice.updateShortCode(link.id, { code: newCode }).subscribe({
      next: () => {
        link.code = newCode;
        this.successMessage = '✅ Short code updated';
        setTimeout(()=> this.successMessage='',2000);
      }
    });
  }

  // ✅ Delete Link
  deleteLink(id: number) {
    if (!confirm('Delete this link?')) return;

    this.statsservice.deleteLink(id).subscribe({
      next: () => {
        this.successMessage = '✅ Link deleted';
        this.loadLinks();
      }
    });
  }
}
