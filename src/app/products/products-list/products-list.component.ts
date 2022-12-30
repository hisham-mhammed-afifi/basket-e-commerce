import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct, Product, ProductResponse } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  productsCount: number = 0;
  categories: { src: string; title: string }[] = [];
  currentPage = 1;

  constructor(private productsSrv: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productsSrv.getProducts().subscribe((res: ProductResponse) => {
      this.products = res.products;
      this.productsCount = res.total;
    });
  }

  getCategories() {
    this.productsSrv.getCategories().subscribe((cats: string[]) => {
      this.categories = [...cats].map((cat) => {
        return { src: `assets/images/categories/${cat}.png`, title: cat };
      });
    });
  }

  selectCatrgory(category: string) {
    this.router.navigate(['products', 'category', category]);
  }

  addToCart(product: CartProduct) {
    this.productsSrv.addToCart(product);
  }

  isInCart(product: Product): boolean {
    return this.productsSrv.isInCart(product.id);
  }

  gotoPage(page: number) {
    const skip = (page - 1) * 20;
    this.productsSrv.getProducts(skip).subscribe((res: ProductResponse) => {
      this.products = res.products;
      this.productsCount = res.total;
    });
  }
}
