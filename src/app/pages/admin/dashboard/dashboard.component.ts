import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../services/analytics.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: any = {};
  loading = true;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.analyticsService.getStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

}
