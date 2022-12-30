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
  imgSrc: string = '';
  qty: number = 1;
  productId: number = 0;
  product!: Product;
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
    this.productsSrv.getSingleProduct(id).subscribe((product) => {
      this.product = product;
      this.imgSrc = product.thumbnail;
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

  zoom(e: MouseEvent, zoomIn = true) {
    const img = e.target as HTMLImageElement;
    const x = e.clientX - img?.offsetLeft;
    const y = e.clientY - img?.offsetTop;
    if (zoomIn) {
      img.style.transformOrigin = `${x}px ${y}px`;
      img.style.transform = `scale(2)`;
    } else {
      img.style.transformOrigin = `center center`;
      img.style.transform = `scale(1)`;
    }
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
