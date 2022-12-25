import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import { CartProduct, SearchResult } from 'src/app/models/Product';
import { AuthService, User } from 'src/app/services/auth.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  hiddenList = false;
  user: User = this.authSrv.emptyUser();
  loggedIn: boolean = false;
  @Input() searchResult: SearchResult[] = [];
  @Input() cartProducts: CartProduct[] = [];
  @Output() search = new EventEmitter();

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef<HTMLInputElement>;

  @HostListener('document:click', ['$event'])
  clickedOut(event: any) {
    if (event.target !== this.searchInput.nativeElement) {
      this.hiddenList = true;
    } else {
      this.hiddenList = false;
    }
  }

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  ngAfterViewInit(): void {
    this.searchDebouncer(this.searchInput);
  }

  openCart(content: TemplateRef<any>) {
    if (!this.checkLogin()) return;
    this.offcanvasService.open(content, {
      position: 'end',
      animation: true,
    });
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

  getLoggedInUser() {
    this.user = this.authSrv.getUser() ?? this.authSrv.emptyUser();
    this.loggedIn = !!this.authSrv.getToken();
    this.authSrv.user.subscribe((user) => (this.user = user));
    this.authSrv.loggedIn.subscribe((res) => (this.loggedIn = res));
  }

  logout() {
    if (!this.checkLogin()) return;
    this.authSrv.logout();
    this.authSrv.loggedIn = false;
    this.authSrv.user = this.authSrv.emptyUser();
  }

  checkLogin(): boolean {
    if (!this.loggedIn) {
      this.router.navigateByUrl('/login');
    }
    return this.loggedIn;
  }

  getTotalPrice() {
    let prices = [...this.cartProducts].map((p) => p.price * p.qty);
    return prices.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  resetSearch() {}
}
