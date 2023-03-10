import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CartComponent } from './cart/cart.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { SearchResultComponent } from './header/search-result/search-result.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { SingleProductComponent } from './single-product/single-product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    CartComponent,
    ProductsListComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesListComponent,
    SearchResultComponent,
    ProductComponent,
    CategoryComponent,
    SingleProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
