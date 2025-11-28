import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products`);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
  addProduct(data: any) {
    return this.http.post(`${environment.apiUrl}/products`, data);
  }

  getProductById(id: string) {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }

  updateProduct(id: string, data: any) {
    return this.http.put(`${environment.apiUrl}/products/${id}`, data);
  }

}
