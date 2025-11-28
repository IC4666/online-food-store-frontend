import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  name = '';
  email = '';
  phone = '';
  address = '';

  cartItems: any[] = [];
  total = 0;
  loading = true;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cartItems = res.items;
        this.total = this.cartItems.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  placeOrder() {
    if (!this.name || !this.phone || !this.address) {
      alert("Please fill all required fields!");
      return;
    }

    const orderData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: () => {
        this.router.navigate(['/order-success']);
      },
      error: () => alert("Failed to place order.")
    });
  }
}
