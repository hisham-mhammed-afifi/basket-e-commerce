import { Component, OnInit } from '@angular/core';

import { Product, SearchResult } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  searchResult: SearchResult[] = [];

  constructor(private productsSrv: ProductsService) {}

  ngOnInit(): void {}

  getSearchResult(searchTerm: string): void {
    this.productsSrv.getSearchResult(searchTerm).subscribe((res) => {
      this.searchResult = res.products.map((p: any) => {
        return {
          image: p.thumbnail,
          title: p.title,
          price: p.price,
          category: p.category,
        };
      });
    });
  }
}
