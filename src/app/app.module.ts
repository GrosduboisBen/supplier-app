import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyListComponent } from './components/companies/company-list/company-list.component';
import { MatCardModule } from '@angular/material/card';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProviderComponent } from './components/provider/provider.component';
import { MissionsComponent } from './components/missions/missions.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';
@NgModule({ declarations: [
        AppComponent,
        CompanyListComponent,
        ProjectsComponent,
        ProviderComponent,
        MissionsComponent,
        OrdersComponent,
        EvaluationsComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatTableModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
