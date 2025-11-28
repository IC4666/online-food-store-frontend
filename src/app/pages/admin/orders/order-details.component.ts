import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {

  order: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderById(id).subscribe({
      next: (res: any) => {
        this.order = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Failed to load order');
      }
    });
  }

  updateStatus(status: string) {
    if (!this.order) return;
    this.orderService.updateOrderStatus(this.order._id, status).subscribe({
      next: () => {
        alert('Status updated');
        this.order.status = status;
      },
      error: () => alert('Failed to update status')
    });
  }
}
