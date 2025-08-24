import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { MATERIAL_IMPORTS } from 'material.import';
import { filter } from 'rxjs/operators';

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

  subtitle = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateSubtitle(event.urlAfterRedirects);
    });
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
        this.subtitle = 'Orders overview';
        break;
      case '/missions':
        this.subtitle = 'Mission tracker';
        break;
      case '/evaluations':
        this.subtitle = 'Evaluate missions';
        break;
      default:
        this.subtitle = '';
    }
  }
}
