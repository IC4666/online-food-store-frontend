import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  loading = true;
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cartItems = res.items;
        this.calculateTotal();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  removeItem(productId: string) {
    this.cartService.removeItem(productId).subscribe(() => {
      this.loadCart();
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
