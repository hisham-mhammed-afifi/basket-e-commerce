import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductResponse } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: { src: string; title: string }[] = [];

  constructor(private _productsSrv: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this._productsSrv.getProducts().subscribe((res: ProductResponse) => {
      this.products = res.products;
    });
  }

  getCategories() {
    this._productsSrv.getCategories().subscribe((cats: string[]) => {
      this.categories = [...cats].map((cat) => {
        return { src: `assets/images/categories/${cat}.png`, title: cat };
      });
    });
  }

  selectCatrgory(category: string) {
    console.log(category);
    this.router.navigate(['products', 'category', category]);
  }
}
