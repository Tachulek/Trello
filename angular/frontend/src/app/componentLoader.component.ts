import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentLoaderHostDirective } from './componentLoader-host.directive';
import { ComponentLoaderService } from './componentLoader.service';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-componentLoader-container',
  template: `
    <ng-template appComponentLoader></ng-template>
  `
})
export class ComponentLoaderComponent implements OnInit {
  @ViewChild(ComponentLoaderHostDirective, { static: true })
  componentHost: ComponentLoaderHostDirective;

  constructor(private componentService: ComponentLoaderService, private auth: AuthenticationService) {}

   viewContainerRef: ViewContainerRef;

  ngOnInit() {
         this.viewContainerRef = this.componentHost.viewContainerRef;
         this.componentService.setViewContainerRef(this.viewContainerRef)
         if(!this.viewContainerRef)
         {
            if(this.auth.isLoggedIn())
            {
              this.componentService.loadComponent("Table");
            }
            else
            {
              this.componentService.loadComponent("Empty"); 
            }
         }
  }

}