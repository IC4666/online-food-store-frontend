import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  addToCart(productId: string) {
    return this.http.post(`${environment.apiUrl}/cart`, {
      productId,
      quantity: 1
    });
  }

  getCart() {
    return this.http.get(`${environment.apiUrl}/cart`);
  }

  removeItem(productId: string) {
  return this.http.delete(`${environment.apiUrl}/cart/${productId}`);
}

  clearCart() {
    return this.http.delete(`${environment.apiUrl}/cart`);
  }
}
