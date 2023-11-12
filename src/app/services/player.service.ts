import { Injectable } from '@angular/core';
import { Product } from '../interfaces';
import { BehaviorSubject } from 'rxjs';

let dummyProduct = {
  ID: '',
  name: '',
  price: 0,
  rarity: '',
  imgName: '',
  quantity: 0,
};

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  $inventory: BehaviorSubject<Product[]> = new BehaviorSubject([dummyProduct]);
  money: number = 0;

  constructor() {
    this.$inventory.next([]);
  }

  addToInventory(newItem: Product): void {
    let currentList = this.$inventory.getValue();

    currentList.push(newItem);
    this.$inventory.next(currentList);
  }

  editInvProd(p: Product): void {
    let currentList = this.$inventory.getValue();

    let newValues = currentList.map((prods) => {
      if (prods.ID === p.ID) {
        p.quantity++;
        return p;
      }

      return prods;
    });

    this.$inventory.next(newValues);
  }
}
