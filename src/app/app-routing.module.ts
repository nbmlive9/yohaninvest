import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReferralRegistrationComponent } from './pages/referral-registration/referral-registration.component';
import { DashbaordComponent } from './pages/User/dashbaord/dashbaord.component';

const routes: Routes = [
  {path:"auth-login",component:LoginComponent },
  {path:"",component:LoginComponent },
  {path:"auth-signup",component:RegistrationComponent },
{ path: "auth-sponsorsignup/:regid", component: ReferralRegistrationComponent },

  //Admin Routings
  { path: "dashboard", component: DashbaordComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  
  // {path:"activation/:regid",component:UserActivation, canActivate: [AuthGuard], data: { roles: ['user'] } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
