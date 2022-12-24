import { Component, OnInit } from '@angular/core';
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
    document.body.scrollTop = 0;
  }

  ngOnInit(): void {
    this.category.title = this.route.snapshot.paramMap.get('category') ?? '';
    this.category.src = `assets/images/categories/${this.category.title}.png`;

    this.getProducts(this.category.title);
  }

  getProducts(category: string) {
    this.productsSrv.getCategoryProducts(category).subscribe((res) => {
      this.products = res.products;
    });
  }
}
