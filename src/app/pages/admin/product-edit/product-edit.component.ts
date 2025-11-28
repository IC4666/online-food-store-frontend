import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId!: string;
  loading = true;

  product: any = {
    name: '',
    description: '',
    price: null,
    category: '',
    stock: null,
    image: ''
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProductById(this.productId).subscribe({
      next: (res: any) => {
        this.product = res;
        this.loading = false;
      },
      error: () => {
        alert("Failed to load product.");
        this.loading = false;
      }
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.productId, this.product).subscribe({
      next: () => {
        alert("Product updated successfully!");
        this.router.navigate(['/admin/products']);
      },
      error: () => {
        alert("Failed to update product.");
      }
    });
  }
}
