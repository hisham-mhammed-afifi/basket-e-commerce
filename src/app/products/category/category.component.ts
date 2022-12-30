import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  category: { src: string; title: string } = { src: '', title: '' };
  constructor(
    private route: ActivatedRoute,
    private productsSrv: ProductsService
  ) {
    window.scrollTo(0, 0);
    this.setCategory();
  }

  ngOnInit(): void {}

  setCategory() {
    const title = this.route.snapshot.paramMap.get('category') ?? '';
    if (title) {
      this.category = {
        title,
        src: `assets/images/categories/${title}.png`,
      };
      this.getProducts(title);
    }
  }

  getProducts(category: string) {
    this.productsSrv.getCategoryProducts(category).subscribe((res) => {
      this.products = res.products;
    });
  }
}
