import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  // Place an order
  placeOrder(orderData: any) {
    return this.http.post(`${environment.apiUrl}/orders`, orderData);
  }

  // Get my orders (for logged-in user)
  getMyOrders() {
    return this.http.get(`${environment.apiUrl}/orders`);
  }

  // Get order details by ID
  getOrderById(id: string) {
    return this.http.get(`${environment.apiUrl}/orders/${id}`);
  }

  // Admin: Get all orders
  getAllOrders() {
    return this.http.get(`${environment.apiUrl}/orders/admin/all`);
  }

  updateOrderStatus(id: string, status: string) {
    return this.http.put(`${environment.apiUrl}/orders/${id}/status`, { status });
  }



}
