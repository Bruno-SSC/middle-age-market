import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces';
import { Subject } from 'rxjs';

interface Departments {
  [key: string]: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  dataURl: string = 'assets/data/products.json';
  $products: Subject<Departments> = new Subject();

  constructor(private http: HttpClient) {
    this.readJson();
  }

  readJson(): void {
    this.http.get<JSON>(this.dataURl).subscribe((data) => {
      let string = JSON.stringify(data);
      let products = JSON.parse(string);
      this.$products.next(products);
    });
  }

  getProducts() {
    return this.$products;
  }
}
