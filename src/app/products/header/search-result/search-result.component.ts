import { Component, Input, OnInit } from '@angular/core';
import { SearchResult } from 'src/app/models/Product';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  @Input() searchResult: SearchResult[] = [];

  constructor() {}

  ngOnInit(): void {}
}
