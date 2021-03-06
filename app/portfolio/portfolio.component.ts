import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StocksService } from '../core/stocks.service';
import { AppComponent } from '../app.component';

@Component({
  moduleId: module.id,
  selector: 'tradity-portfolio',
  templateUrl: 'portfolio.component.html',
  styles: [':host { display: flex; flex-direction: column; padding: 20px; }']
})
export class PortfolioComponent {
  constructor(private appComponent: AppComponent) {
    this.appComponent.heading2 = 'Portfolio';
  }
}