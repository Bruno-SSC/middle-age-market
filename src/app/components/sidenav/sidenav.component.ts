import { Component } from '@angular/core';
import { slideDown } from 'src/app/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [slideDown],
})
export class SidenavComponent {}
