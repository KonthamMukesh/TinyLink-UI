import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  createLinkForm!: FormGroup;

  links: any[] = [];
  filteredLinks: any[] = [];

  loading = false;
  successMessage = '';
  errorMessage = '';

  searchText = '';

  stats = {
    all: 0,
    active: 0,
    inactive: 0
  };
window: any;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {}

private refreshTimer: any;

ngOnInit() {
  this.createLinkForm = this.fb.group({
    longUrl: ['', Validators.required],
    customCode: ['', [Validators.pattern(/^[A-Za-z0-9]{6,8}$/)]]
  });

  this.loadLinks();

  this.refreshTimer = setInterval(() => {
    this.loadLinks();
  }, 5000);
}

ngOnDestroy() {
  clearInterval(this.refreshTimer);
}

  // ✅ CREATE LINK
  createShortLink() {
    if (this.createLinkForm.invalid) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const body = {
      longUrl: this.createLinkForm.value.longUrl,
      customCode: this.createLinkForm.value.customCode || null
    };

    this.dashboardService.createShortLink(body).subscribe({
      next: () => {
        this.successMessage = '✅ Short link created successfully!';
        this.createLinkForm.reset();
        this.loadLinks();
        this.loading = false;
      },
      error: (err) => {
        if (err.status === 409) {
          this.errorMessage = '❌ Custom code already exists';
        } else {
          this.errorMessage = '❌ Failed to create link';
        }
        this.loading = false;
      }
    });
  }

  // ✅ LOAD LINKS
 loadLinks() {
  this.dashboardService.getAllLinks().subscribe({
    next: (res: any) => {
      this.links = res || [];
      this.filteredLinks = [...this.links];
      this.calculateStats();
      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}


  // ✅ STATS
  calculateStats() {
    this.stats.all = this.links.length;
    this.stats.active = this.links.filter(l => l.clicks > 0).length;
    this.stats.inactive = this.links.filter(l => l.clicks === 0).length;
  }

  // ✅ SEARCH
 filterLinks() {
  const text = this.searchText.toLowerCase();
  this.filteredLinks = this.links.filter(link =>
    link.long_url?.toLowerCase().includes(text) ||
    link.code?.toLowerCase().includes(text)
  );
}


  // ✅ COPY
copy(code: string) {
  const shortUrl = `https://tinylink-api-g739.onrender.com/r/${code}`;
  navigator.clipboard.writeText(shortUrl).then(() => {
    alert('✅ Short link copied successfully!');
  });
}



  // ✅ OPEN LINK
visit(code: string) {
  window.open(`https://tinylink-api-g739.onrender.com/r/${code}`, '_blank');
}





  // ✅ DELETE
  deleteLink(id: number) {
    if (!confirm('Delete this link?')) return;

    this.dashboardService.deleteLink(id).subscribe({
      next: () => {
        this.successMessage = '✅ Link deleted';
        this.loadLinks();
      }
    });
  }

  // ✅ EDIT
editLink(link: any) {
  const newCode = prompt('Edit Short Code', link.code);
  if (!newCode) return;

  this.dashboardService.updateShortCode(link.code, {
    newCode: newCode
  }).subscribe({
    next: () => {
      alert('✅ Short URL updated');
      this.loadLinks();
    },
    error: (err) => {
      if (err.status === 409) {
        alert('❌ Code already exists');
      } else {
        alert('❌ Update failed');
      }
    }
  });
}


}
