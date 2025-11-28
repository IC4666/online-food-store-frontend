import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any[] = [];
  featuredProducts: any[] = [];
  categories: string[] = ['Fast Food', 'Meals', 'Drinks', 'Snacks', 'Dessert'];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.products || res || [];
        // Get 6 featured products (you can randomize or sort by rating)
        this.featuredProducts = this.products.slice(0, 6);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
