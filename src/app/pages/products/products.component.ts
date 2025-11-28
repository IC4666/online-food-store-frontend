import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  allProducts: any[] = [];
  filteredProducts: any[] = [];
  loading = true;
  
  // Filter properties
  searchTerm: string = '';
  selectedCategory: string = '';
  sortBy: string = 'default';
  categories: string[] = ['Fast Food', 'Meals', 'Drinks', 'Snacks', 'Dessert'];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadProducts();
    
    // Check for category from query params
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.applyFilters();
      }
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.allProducts = res.products || res || [];
        this.filteredProducts = this.allProducts;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let filtered = [...this.allProducts];

    // Filter by search term
    if (this.searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Sort products
    if (this.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.filteredProducts = filtered;
  }

  onSearchChange() {
    this.applyFilters();
  }

  onCategoryChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.sortBy = 'default';
    this.filteredProducts = [...this.allProducts];
  }
}
