import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventsComponent } from "./events/events.component";
import { VenuesComponent } from "./venues/venues.component";
import { EventStartComponent } from "./events/event-start/event-start.component";
import { EventDetailComponent } from "./events/event-detail/event-detail.component";
import { EventEditComponent } from "./events/event-edit/event-edit.component";
import { EventResolverService } from "./_services/event-resolver.service";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./_helpers/auth.guard";
import { Role } from "./_models/role";
import { VenueResolverService } from "./_services/venue-resolver.service";
import { VenueDetailComponent } from "./venues/venue-detail/venue-detail.component";
import { VenueEditComponent } from "./venues/venue-edit/venue-edit.component";
import { AdminGuard } from "./_helpers/admin.guard";
import { UsersComponent } from "./users/users.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { UserDetailComponent } from "./users/user-detail/user-detail.component";
import { UserResolverService } from "./_services/user-resolver.service";
import { PasswordResetComponent } from "./auth/password-reset/password-reset.component";
import { PasswordUpdateComponent } from "./auth/password-update/password-update.component";
import { ActivationComponent } from "./auth/activation/activation.component";
import { ActivationErrorComponent } from "./auth/activation-error/activation-error.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileEditComponent } from "./profile/profile-edit/profile-edit.component";
import { ProfileDetailComponent } from "./profile/profile-detail/profile-detail.component";
import { ProfilePasswordComponent } from './profile/profile-password/profile-password.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: "", redirectTo: "/events", pathMatch: "full" },
  {
    path: "events",
    component: EventsComponent,
    resolve: [EventResolverService, VenueResolverService],
    children: [
      { path: "", component: EventStartComponent },
      {
        path: "new",
        component: EventEditComponent,
        canActivate: [AuthGuard]
      },
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
        data: { expectedRole: "admin" }
      }
    ]
  },
  {
    path: "calendar",
    component: CalendarComponent,
    resolve: [EventResolverService]
  },
  {
    path: "venues",
    component: VenuesComponent,
    resolve: [VenueResolverService],
    children: [
      {
        path: "new",
        component: VenueEditComponent,
        canActivate: [AdminGuard]
      },
      {
        path: ":id",
        component: VenueDetailComponent,
        resolve: [VenueResolverService, EventResolverService]
      },
      {
        path: ":id/edit",
        canActivate: [AdminGuard],
        component: VenueEditComponent
        // resolve: [EventResolverService],
        // data: { expectedRole: 'admin' }
      }
    ]
  },
  {
    path: "users",
    component: UsersComponent,
    resolve: [UserResolverService],
    canActivate: [AdminGuard],
    children: [
      {
        path: "new",
        component: UserEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ":id",
        component: UserDetailComponent
        // resolve: [UserResolverService]
      },
      {
        path: ":id/edit",
        component: UserEditComponent
      }
    ]
  },
  {
    path: "profile",
    component: ProfileComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: ProfileDetailComponent
      },
      {
        path: "edit",
        component: ProfileEditComponent
        // canActivate: [UserGuard]
      },
      {
        path: "password-update",
        component: ProfilePasswordComponent
      }
    ]
  },
  { path: "auth/signup", component: SignupComponent },
  { path: "auth/login", component: LoginComponent },
  { path: "auth/activation", component: ActivationComponent },
  { path: "auth/activation_error", component: ActivationErrorComponent },
  { path: "auth/password-reset", component: PasswordResetComponent },
  { path: "auth/password-update/:token", component: PasswordUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
