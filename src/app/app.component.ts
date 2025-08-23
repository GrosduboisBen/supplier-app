import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
// import { CompanyListComponent } from './components/companies/company-list/company-list.component';
// import { ProjectsComponent } from './components/projects/projects.component';
// import { EvaluationsComponent } from './components/evaluations/evaluations.component';
// import { OrdersComponent } from './components/orders/orders.component';
// import { MissionsComponent } from './components/missions/missions.component';
// import { ProviderComponent } from './components/provider/provider.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    RouterModule,
    // AppComponent,
    // CompanyListComponent,
    // ProjectsComponent,
    // ProviderComponent,
    // MissionsComponent,
    // OrdersComponent,
    // EvaluationsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
