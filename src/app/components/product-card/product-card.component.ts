import { Component, Input } from '@angular/core';
import { slideDown } from 'src/app/animations';
import { Product } from 'src/app/interfaces';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [slideDown],
})
export class ProductCardComponent {
  @Input() product: Product | undefined;

  alreadyBought: Product[] = [];

  constructor(private player: PlayerService) {}

  addToInventory(newItem: Product | undefined): void {
    if (newItem === undefined) return;
    
    this.alreadyBought.forEach((p) => {
      if (p.ID == newItem.ID) {
        this.player.editInvProd(p);
        return;
      }
      this.alreadyBought.push(newItem);
      this.player.addToInventory(newItem);
    });

    if (this.alreadyBought.length === 0) {
      this.alreadyBought.push(newItem);
      this.player.addToInventory(newItem);
      return;
    }
  }
}
