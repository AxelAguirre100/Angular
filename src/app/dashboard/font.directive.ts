import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective {
  @HostBinding('style.font-size') fontSize = '30px';

  constructor() {}
}