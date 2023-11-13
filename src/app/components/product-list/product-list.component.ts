import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/interfaces';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [],
})
export class ProductListComponent implements OnInit {
  department: string = 'armor';
  products: Product[] = [];
  departNames = ['armor', 'utils', 'magic', 'tools', 'weapons'];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        e.url = this.cleanUrl(e.url);
        if (!this.isItAdepartment(e.url)) return;
        if (e.url == '') return;
        this.department = e.url;
        this.refreshProducts();
      }
    });
  }

  cleanUrl(url: string): string {
    url = url.slice(1, url.length); //remove first "/"
    let cutPoint = url.indexOf('/');
    if (cutPoint != -1) url = url.slice(0, cutPoint); //remove the second "/", if any
    return url;
  }

  isItAdepartment(path: string): boolean {
    let isIt = false;
    this.departNames.forEach((name) => {
      if (path === name) {
        isIt = true;
      }
    });
    return isIt;
  }

  ngOnInit(): void {
    this.updateProducts();
  }

  refreshProducts(): void {
    this.productsService.readJson();
  }

  updateProducts() {
    this.productsService.getProducts().subscribe((prodsList) => {
      if (prodsList[this.department] == undefined) return;
      this.products = Object.values(prodsList[this.department]);
    });
  }
}
