import { Directive, Input } from '@angular/core';

@Directive({
  // selector: '[appImgPreload]'
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'updateUrl()',
  },
})
export class ImgPreloadDirective {
  @Input() src: string = '';
  @Input() default: string = 'assets/images/user-placeholder.svg';

  constructor() {}

  updateUrl() {
    this.src = this.default;
  }
}
