import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LastTaskComponent } from './pages/last-task/last-task.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AuthGuard } from './_helpers/AuthGuard';

const routes: Routes = [


   { path: 'login', component: LoginFormComponent },
    {path : '' , component: DashboardComponent, children:[
    {path: 'calendar' , component: CalendarComponent},
    {path: 'lastTask' , component: LastTaskComponent}
   
  ], canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
