import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { StatsComponent } from './Components/stats/stats.component';
import { HealthCheckComponent } from './Components/health-check/health-check.component';
import { RedirectComponent } from './Components/redirect/redirect.component';
// import { NotFoundComponent } from './Components/not-found/not-found.component';

export const routes: Routes = [
  // ✅ Main Pages
  { path: '', component: DashboardComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'healthz', component: HealthCheckComponent },

  // ✅ Stats by code
  { path: 'code/:code', component: StatsComponent },

  // ✅ 404 Page
  { path: 'not-found', component: RedirectComponent },

  // ✅ Redirect handler (must stay second last)
  { path: ':code', component: RedirectComponent },

  // ✅ Catch-all wildcard (must be LAST)
  { path: '**', redirectTo: 'not-found' }
];
