import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  constructor() {}

  ngOnInit(): void {}

  getPreDiscount(price: number, discount: number): number {
    return price / (1 - discount / 100);
  }
}
