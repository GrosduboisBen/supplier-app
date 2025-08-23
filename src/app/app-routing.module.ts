import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './components/companies/company-list/company-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProviderComponent } from './components/provider/provider.component';

const routes: Routes = [
  { path: 'companies', component: CompanyListComponent },
  { path: '', redirectTo: 'companies', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'providers', component: ProviderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
