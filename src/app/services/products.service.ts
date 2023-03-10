import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { CartProduct, Product, ProductResponse } from '../models/Product';

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

  getProducts(skip: number = 0): Observable<ProductResponse> {
    const options = { params: { limit: 20, skip } };
    return this._http.get<ProductResponse>(this.BaseUrl, options);
  }

  getSingleProduct(id: number): Observable<Product> {
    return this._http.get<Product>(this.BaseUrl + '/' + id);
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

  getCartProduct(id: number): CartProduct | undefined {
    return this.getCartProducts().find((p) => p.id === id);
  }

  setCartProducts(cartProducts: CartProduct[]) {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }

  addToCart(cartProduct: CartProduct) {
    let products = JSON.parse(localStorage.getItem('cartProducts') ?? '') ?? [];
    this.cartProducts = this.getUnique([cartProduct, ...products]);
    this.cartProducts.subscribe((products) => {
      this.setCartProducts(products);
    });
  }

  removeFromCart(id: number) {
    let products = JSON.parse(localStorage.getItem('cartProducts') ?? '') ?? [];
    this.cartProducts = products.filter((p: CartProduct) => p.id !== id);
    this.cartProducts.subscribe((products) => {
      this.setCartProducts(products);
    });
  }

  updateCart(cartProduct: CartProduct) {
    let products = JSON.parse(localStorage.getItem('cartProducts') ?? '') ?? [];
    let idx = products.findIndex((p: CartProduct) => p.id === cartProduct.id);
    if (idx === -1) return;
    products[idx].qty = cartProduct.qty;
    products[idx].total = cartProduct.total;
    this.cartProducts = this.getUnique([...products]);
    this.cartProducts.subscribe((products) => {
      this.setCartProducts(products);
    });
  }

  isInCart(productId: number): boolean {
    const products = this.cartProductsSub.getValue();
    return !!products.find((p) => p.id === productId);
  }

  getUnique(arr: any[]): any[] {
    const flags: any = {};
    return arr.filter((obj) => {
      if (flags[obj.id]) {
        return false;
      }
      flags[obj.id] = true;
      return true;
    });
  }
}
