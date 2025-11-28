import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {

  @Input() product: any;

  constructor(private router: Router) {}

  viewProduct() {
    this.router.navigate(['/products', this.product._id]);
  }
}
