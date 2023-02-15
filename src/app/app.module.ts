import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { JwtInterceptor } from './_helpers/jwt.intercepteur';
import { MatDialogModule } from '@angular/material/dialog';
import { EventClickComponent } from './components/event-click/event-click.component';
import { AddTitleEventComponent } from './components/add-title-event/add-title-event.component';
import { LastTaskComponent } from './pages/last-task/last-task.component';
import { TaskCardComponent } from './components/task-card/task-card.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DashboardComponent,
    CalendarComponent,
    EventClickComponent,
    AddTitleEventComponent,
    LastTaskComponent,
    TaskCardComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FullCalendarModule,
    MatDialogModule,
   

    
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true} , ],
  bootstrap: [AppComponent]
})
export class AppModule { }
