

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appComponentLoader]' })
export class ComponentLoaderHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}