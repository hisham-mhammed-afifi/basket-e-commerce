import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { CartProduct, ProductResponse } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private BaseUrl = BaseUrl + '/products';

  private cartProductsSub = new BehaviorSubject<CartProduct[]>([]);
  get cartProducts(): Observable<CartProduct[]> {
    return this.cartProductsSub.asObservable();
  }

  set cartProducts(value: any) {
    this.cartProductsSub.next(value);
  }

  constructor(private _http: HttpClient) {
    if (!localStorage.getItem('cartProducts')) {
      this.setCartProducts(this.cartProductsSub.getValue());
    }
  }

  getProducts(): Observable<ProductResponse> {
    const options = { params: { limit: 20, skip: 0 } };
    return this._http.get<ProductResponse>(this.BaseUrl, options);
  }

  getCategoryProducts(category: string): Observable<ProductResponse> {
    const options = { params: { limit: 20, skip: 0 } };
    return this._http.get<ProductResponse>(
      this.BaseUrl + '/category/' + category,
      options
    );
  }

  getCategories(): Observable<string[]> {
    return this._http.get<string[]>(this.BaseUrl + '/categories');
  }

  getSearchResult(searchTerm: string): Observable<ProductResponse> {
    const options = searchTerm ? { params: { q: searchTerm } } : {};
    return this._http.get<ProductResponse>(this.BaseUrl + '/search', options);
  }

  getCartProducts(): CartProduct[] {
    const products =
      JSON.parse(localStorage.getItem('cartProducts') ?? '') ?? [];
    this.cartProducts = products;
    return products;
  }

  setCartProducts(cartProducts: CartProduct[]) {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }

  addToCart(cartProduct: CartProduct) {
    const products =
      JSON.parse(localStorage.getItem('cartProducts') ?? '') ?? [];
    this.cartProducts = [cartProduct, ...products];
    this.cartProducts.subscribe((products) => {
      this.setCartProducts(products);
    });
  }

  isInCart(productId: number): boolean {
    const products = this.cartProductsSub.getValue();
    return !!products.find((p) => p.id === productId);
  }
}
