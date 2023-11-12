import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): void {
    const products = this.http.get('../scripts/products.json');
    products.subscribe((data) => {
      console.log(data);
    });
  }
}
