import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [RatingComponent, CarouselComponent],
  imports: [
    CommonModule,
    NgbRatingModule,
    NgbCarouselModule,
    NgbDropdownModule,
  ],
  exports: [RatingComponent, CarouselComponent, NgbDropdownModule],
})
export class SharedModule {}
