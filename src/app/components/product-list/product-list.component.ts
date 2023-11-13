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

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        e.url = e.url.slice(1, e.url.length); //remove first "/"
        let cutPoint = e.url.indexOf('/');
        if (cutPoint != -1) e.url = e.url.slice(0, cutPoint); //remove the second "/", if any
        if (e.url == '') return;
        this.department = e.url;
        this.refreshProducts();
      }
    });
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
