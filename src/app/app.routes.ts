import { Routes } from '@angular/router';
import { CompanyComponent } from './components/companies/company.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MissionsComponent } from './components/missions/missions.component';
import { ProviderComponent } from './components/provider/provider.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';
// ajoute les autres composants

export const appRoutes: Routes = [
  { path: 'companies', component: CompanyComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'missions', component: MissionsComponent },
  { path: 'providers', component: ProviderComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'evaluations', component: EvaluationsComponent },

  // ajoute les autres routes ici
  { path: '', redirectTo: 'companies', pathMatch: 'full' }
];
