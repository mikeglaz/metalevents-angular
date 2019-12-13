import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { EventsComponent } from './events/events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventItemComponent } from './events/event-list/event-item/event-item.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { VenuesComponent } from './venues/venues.component';
import { EventStartComponent } from './events/event-start/event-start.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';

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
    EventEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
