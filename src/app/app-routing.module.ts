import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventsComponent } from "./events/events.component";
import { VenuesComponent } from "./venues/venues.component";
import { EventStartComponent } from './events/event-start/event-start.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';

const routes: Routes = [
  // { path: '', redirectTo: '/events', pathMatch: "full" },

  { path: "", component: EventsComponent },
  { path: "events", component: EventsComponent, children: [
    { path: '', component: EventStartComponent },
    { path: 'new', component: EventEditComponent },
    { path: ':id', component: EventDetailComponent },
    { path: ':id/edit', component: EventEditComponent }
  ]},
  { path: "venues", component: VenuesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
