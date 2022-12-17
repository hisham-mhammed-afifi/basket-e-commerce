import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { ProductResponse } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private BaseUrl = BaseUrl + '/products';

  constructor(private _http: HttpClient) {}

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
}
