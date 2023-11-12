import { Component } from '@angular/core';
import { showUp, slideDown } from 'src/app/animations';
import { Product } from 'src/app/interfaces';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  animations: [showUp, slideDown],
})
export class PlayerInfoComponent {
  inventory: Product[] = [];
  slots: Array<number> = [];

  constructor(private player: PlayerService) {
    this.player.$inventory.subscribe((inv) => {
      this.inventory = inv;
      this.createSlots();
    });
  }

  productImg(slot: number): string {
    // FIXME: depois que eu fiz essa função descobri que bastava apenas acessar direto no template. MAS, não quis apagar. Vai que tá problam com os undefined e tals.
    if (this.inventory[slot] == undefined) return '';
    let img = this.inventory[slot].imgName;
    return '../../../assets/images/products/' + img;
  }

  trigInvItemAnim(slot: number): boolean {
    if (this.inventory[slot] == undefined) return false;
    return true;
  }

  createSlots(): void {
    const invNumber = this.inventory.length;
    if (invNumber > this.slots.length) {
      for (let i = 0; i < invNumber; i++) {
        this.slots[i] = i;
      }
    }

    if (invNumber <= this.slots.length) {
      for (let i = 0; i < 8; i++) {
        this.slots[i] = i;
      }
    }
  }
}
