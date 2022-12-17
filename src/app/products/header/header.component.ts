import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { SearchResult } from 'src/app/models/Product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() searchResult: SearchResult[] = [];
  @Output() search = new EventEmitter();

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef<HTMLInputElement>;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.searchDebouncer(this.searchInput);
  }

  searchDebouncer(el: ElementRef) {
    fromEvent(el.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        map((event: any) => event.target.value.trim()),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((res) => this.search.emit(res));
  }
}
