import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './components/companies/company-list/company-list.component';
import { ProjectsComponent } from './components/projects/projects.component';

const routes: Routes = [
  { path: 'companies', component: CompanyListComponent },
  { path: '', redirectTo: 'companies', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
