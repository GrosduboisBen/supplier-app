import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MATERIAL_IMPORTS } from 'material.import';
import { filter } from 'rxjs/operators';
import { HeaderStore } from '../stores/app-stores/header-store';

@Component({
  selector: 'app-header',
  imports: [
    ...MATERIAL_IMPORTS,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,

})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,private headerStore: HeaderStore) {}

  subtitle = '';
  overview = this.headerStore.status;

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateSubtitle(event.urlAfterRedirects);
    });
  }

  public navigateBack() {
    this.router.navigate([this.headerStore.back()]);
    this.headerStore.unsetOverview();
    this.headerStore.unsetRoute();
  }

  private updateSubtitle(url: string) {
    switch(url) {
      case '/companies':
        this.subtitle = 'Companies';
        break;
      case '/projects':
        this.subtitle = 'Projects';
        break;
      case '/providers':
        this.subtitle = 'Providers';
        break;
      case '/orders':
        this.subtitle = 'Orders';
        break;
      case '/missions':
        this.subtitle = 'Missions';
        break;
      case '/evaluations':
        this.subtitle = 'Evaluations';
        break;
      default:
        this.subtitle = '';
    }
  }
}
