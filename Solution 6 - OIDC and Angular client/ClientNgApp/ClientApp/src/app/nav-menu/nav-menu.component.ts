import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  private isAuthorizedSubscription: Subscription = new Subscription();
  public isAuthorized: boolean = false;

  /**
   *
   */
  constructor(private authService: AuthService) {
    this.isAuthorizedSubscription = this.authService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      });
  }

  ngOnDestroy(): void {
    this.isAuthorizedSubscription.unsubscribe();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }
}