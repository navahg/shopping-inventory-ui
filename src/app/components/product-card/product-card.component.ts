import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() name: string;
  @Input() img: string;
  @Input() price: number;
  @Input() description: string;
  @Input() isInStock: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }
}
