import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProduct, Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent implements OnInit {
  qty: number = 1;
  productId: number = 0;
  product!: Product;
  products: Product[] = [];
  addedToCart = false;

  constructor(
    private route: ActivatedRoute,
    private productsSrv: ProductsService
  ) {
    this.route.params.subscribe((params: any) => {
      this.productId = +params.id;
      this.getSingleProduct(this.productId);
    });
  }

  ngOnInit(): void {
    this.getCartProductQTY();
  }

  getSingleProduct(id: number) {
    window.scrollTo(0, 0);
    this.productsSrv.getSingleProduct(id).subscribe((product) => {
      this.product = product;
      this.getProducts(product.category);
    });
  }

  getProducts(category: string) {
    this.productsSrv.getCategoryProducts(category).subscribe((res) => {
      this.products = res.products;
    });
  }

  getPreDiscount(price: number, discount: number): number {
    return price / (1 - discount / 100);
  }

  getCartProductQTY() {
    this.qty = this.productsSrv.getCartProduct(this.productId)?.qty ?? 1;
  }

  addProduct(product: Product) {
    this.addedToCart = true;
    let cartProduct: CartProduct = this.cartProduct(product);
    this.productsSrv.addToCart(cartProduct);
    setTimeout(() => {
      this.addedToCart = false;
    }, 3000);
  }

  cartProduct(product: Product): CartProduct {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail,
      qty: this.qty,
      total: product.price * this.qty,
    };
  }

  increment(stock: number) {
    if (this.qty < stock) {
      this.qty++;
    }
  }

  decrement() {
    if (this.qty > 1) {
      this.qty--;
    }
  }
}
