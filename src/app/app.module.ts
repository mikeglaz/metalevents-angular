import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { EventsComponent } from "./events/events.component";
import { EventListComponent } from "./events/event-list/event-list.component";
import { EventItemComponent } from "./events/event-list/event-item/event-item.component";
import { EventDetailComponent } from "./events/event-detail/event-detail.component";
import { VenuesComponent } from "./venues/venues.component";
import { EventStartComponent } from "./events/event-start/event-start.component";
import { EventEditComponent } from "./events/event-edit/event-edit.component";
// import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthInterceptor } from './_helpers/auth-interceptor';
import { VenueListComponent } from './venues/venue-list/venue-list.component';
import { VenueItemComponent } from './venues/venue-list/venue-item/venue-item.component';
import { VenueDetailComponent } from './venues/venue-detail/venue-detail.component';
import { VenueEditComponent } from './venues/venue-edit/venue-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EventsComponent,
    EventListComponent,
    EventItemComponent,
    EventDetailComponent,
    VenuesComponent,
    EventStartComponent,
    EventEditComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    SignupComponent,
    VenueListComponent,
    VenueItemComponent,
    VenueDetailComponent,
    VenueEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    // FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
