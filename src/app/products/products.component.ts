import { Component, OnInit } from '@angular/core';

import { CartProduct, Product, SearchResult } from '../models/Product';
import { AuthService, User } from '../services/auth.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  searchResult: SearchResult[] = [];
  cartProducts: CartProduct[] = [];
  user: User = { name: '', email: '', image: '' };

  constructor(private productsSrv: ProductsService) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  getSearchResult(searchTerm: string): void {
    this.productsSrv.getSearchResult(searchTerm).subscribe((res) => {
      this.searchResult = res.products.map((p: any) => {
        return {
          id: p.id,
          image: p.thumbnail,
          title: p.title,
          price: p.price,
          category: p.category,
        };
      });
    });
  }

  getCartProducts() {
    this.cartProducts = this.productsSrv.getCartProducts();
    this.productsSrv.cartProducts.subscribe((products) => {
      this.cartProducts = products;
    });
  }
}
