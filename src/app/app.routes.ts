import { Routes } from '@angular/router';
import { CompanyComponent } from './components/companies/company.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MissionsComponent } from './components/missions/missions.component';
import { ProviderComponent } from './components/provider/provider.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';
import { CompanyOverviewComponent } from './components/companies/company-overview/company-overview.component';
import { ProjectOverviewComponent } from './components/projects/project-overview/project-overview.component';
import { OrderOverviewComponent } from './components/orders/order-overview/order-overview.component';
import { MissionOverviewComponent } from './components/missions/mission-overview/mission-overview.component';
// ajoute les autres composants

export const appRoutes: Routes = [
  { path: 'companies', component: CompanyComponent },
  { path: 'companies/:id/overview', component: CompanyOverviewComponent},
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/:id/:companyId/overview', component: ProjectOverviewComponent},
  { path: 'missions', component: MissionsComponent },
    { path: 'missions/:id/:orderId/overview', component: MissionOverviewComponent},
  { path: 'providers', component: ProviderComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id/overview', component: OrderOverviewComponent},
  { path: 'orders/:id/:projectId/:providerId/overview', component: OrderOverviewComponent},
  { path: 'evaluations', component: EvaluationsComponent },
  { path: '', redirectTo: 'companies', pathMatch: 'full' }
];
