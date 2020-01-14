import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventsComponent } from "./events/events.component";
import { VenuesComponent } from "./venues/venues.component";
import { EventStartComponent } from "./events/event-start/event-start.component";
import { EventDetailComponent } from "./events/event-detail/event-detail.component";
import { EventEditComponent } from "./events/event-edit/event-edit.component";
import { EventResolverService } from "./events/event-resolver.service";
// import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';

    const routes: Routes = [
      { path: '', redirectTo: '/events', pathMatch: "full" },
      {
        path: "events",
        component: EventsComponent,
        resolve: [EventResolverService],
        children: [
          { path: "", component: EventStartComponent },
          {
            path: "new",
            component: EventEditComponent,
            canActivate: [AuthGuard] },
          {
            path: ":id",
            component: EventDetailComponent,
            // resolver is for when we reload /events/:id
            resolve: [EventResolverService]
          },
          {
            path: ":id/edit",
            canActivate: [AuthGuard],
            component: EventEditComponent,
            // resolve: [EventResolverService],
            data: { expectedRole: 'admin' }
          }
        ]
      },
  { path: "venues", component: VenuesComponent },
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
