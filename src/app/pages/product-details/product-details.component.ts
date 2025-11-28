import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.productService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product._id).subscribe({
      next: () => this.router.navigate(['/cart']),
      error: () => alert("Failed to add to cart")
    });
  }
}
