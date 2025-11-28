import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  product = {
    name: '',
    description: '',
    price: null,
    category: '',
    stock: null,
    image: ''
  };

  loading = false;

  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
    if (!this.product.name || !this.product.price || !this.product.category) {
      alert('Please fill in all required fields.');
      return;
    }

    this.loading = true;

    this.productService.addProduct(this.product).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/products']);
      },
      error: () => {
        this.loading = false;
        alert("Failed to add product.");
      }
    });
  }
}
