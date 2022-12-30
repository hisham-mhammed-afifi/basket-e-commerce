import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct, Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() isInCart: boolean = false;
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<CartProduct>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  getPreDiscount(price: number, discount: number): number {
    return price / (1 - discount / 100);
  }

  addProduct(product: Product) {
    let cartProduct: CartProduct = this.cartProduct(product);
    this.addToCart.emit(cartProduct);
  }

  cartProduct(product: Product): CartProduct {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      qty: 1,
      total: product.price,
    };
  }

  gotoProduct(product: Product) {
    this.router.navigate(['products', product.id]);
  }
}
