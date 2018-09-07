import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appColorByParameter]'
})
export class ColorByParameterDirective {

  elementRef: ElementRef;

  constructor(el: ElementRef) {
    console.log('directive constructed');
    this.elementRef = el;
  }

  // // For Permanent coloring by the passed parameter
  // @Input('appColorByParameter')
  // set setColorParameter(value: string) {
  //   this.elementRef.nativeElement.style.backgroundColor = value;
  // }

  @Input('appColorByParameter') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'purple');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }

}
