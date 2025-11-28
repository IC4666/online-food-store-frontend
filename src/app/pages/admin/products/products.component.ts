import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: any[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.products || res || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  deleteProduct(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

}
