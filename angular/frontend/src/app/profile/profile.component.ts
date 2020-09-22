import { Component, ViewChild, ViewContainerRef } from '@angular/core'
import { AuthenticationService, UserDetails } from '../authentication.service'
import { ComponentLoaderComponent } from '../componentLoader.component'
import { ComponentLoaderHostDirective } from '../componentLoader-host.directive';
import { ComponentLoaderService } from '../componentLoader.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails
  @ViewChild('app-componentLoader-container', {read: ComponentLoaderComponent}) component
  constructor(private auth: AuthenticationService, private componentLoaderService: ComponentLoaderService) {}

  ngOnInit() {
    this.componentLoaderService.loadComponent("Table")
     console.log('ngoninit')
    const current = this.auth.getUserDetails()
    this.auth.profile(current.id).subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }
}