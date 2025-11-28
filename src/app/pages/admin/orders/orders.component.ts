import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res: any) => {
        // backend admin endpoint returns aggregated orders possibly with `userInfo`
        if (Array.isArray(res) && res.length > 0 && res[0].userInfo) {
          // map userInfo into user for template compatibility
          this.orders = res.map((o: any) => ({ ...o, user: o.userInfo, total: o.totalPrice || o.total }));
        } else {
          this.orders = res;
        }
        this.loading = false;
      },
      error: () => {
        alert("Failed to load orders");
        this.loading = false;
      }
    });
  }

  updateStatus(orderId: string, status: string) {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        alert("Status updated!");
        this.loadOrders();
      },
      error: () => alert("Failed to update status")
    });
  }
}
