import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  showMore = false;
  @Input() categories: { src: string; title: string }[] = [];
  @Output() selectCatrgory = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  selectOne(category: string) {
    this.selectCatrgory.emit(category);
  }
}
