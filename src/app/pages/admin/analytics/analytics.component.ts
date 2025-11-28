import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AnalyticsService } from '../../../services/analytics.service';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {
  stats: any = {};
  loading = true;

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.analytics.getStats().subscribe({
      next: (res) => { this.stats = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
