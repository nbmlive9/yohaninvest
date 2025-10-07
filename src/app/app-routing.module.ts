import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReferralRegistrationComponent } from './pages/referral-registration/referral-registration.component';
import { DashbaordComponent } from './pages/User/dashbaord/dashbaord.component';
import { ProfileComponent } from './pages/User/profile/profile.component';
import { DirectTeamComponent } from './pages/User/direct-team/direct-team.component';
import { ActivationComponent } from './pages/User/activation/activation.component';
import { WalletReportComponent } from './pages/User/wallet-report/wallet-report.component';
import { WalletTodayReportComponent } from './pages/User/wallet-today-report/wallet-today-report.component';
import { RightTeamComponent } from './pages/User/right-team/right-team.component';
import { LeftTeamComponent } from './pages/User/left-team/left-team.component';
import { MatchingRoiReportComponent } from './pages/User/matching-roi-report/matching-roi-report.component';
import { WalletMatchingReportComponent } from './pages/User/wallet-matching-report/wallet-matching-report.component';
import { RoiReportComponent } from './pages/User/roi-report/roi-report.component';
import { TransferWalletComponent } from './pages/User/transfer-wallet/transfer-wallet.component';
import { ReceivedReportComponent } from './pages/User/received-report/received-report.component';
import { TransferReportComponent } from './pages/User/transfer-report/transfer-report.component';
import { SelfTransferComponent } from './pages/User/self-transfer/self-transfer.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { WithdrawRequestComponent } from './pages/User/withdraw-request/withdraw-request.component';
import { TreeRegistrationComponent } from './pages/User/tree-registration/tree-registration.component';
import { TreeViewComponent } from './pages/User/tree-view/tree-view.component';
import { DepositFundComponent } from './pages/User/deposit-fund/deposit-fund.component';
import { SpinRollComponent } from './pages/User/spin-roll/spin-roll.component';
import { CpDashboardComponent } from './pages/User/cp-dashboard/cp-dashboard.component';
import { OtherActivationComponent } from './pages/User/other-activation/other-activation.component';
import { SponsorIncomeComponent } from './pages/User/sponsor-income/sponsor-income.component';
import { SupportComponent } from './pages/User/support/support.component';

const routes: Routes = [
  {path:"auth-login",component:LoginComponent },
  {path:"forgot",component:ForgotPasswordComponent },
  {path:"",component:LoginComponent },
  {path:"auth-signup",component:RegistrationComponent },
{ path: "auth-sponsorsignup/:regid", component: ReferralRegistrationComponent },

  //Admin Routings
  { path: "dashboard", component: DashbaordComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: "directreferrals", component: DirectTeamComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
   { path: "activation", component: ActivationComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
     { path: "useractivation", component: OtherActivationComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "walletreport", component: WalletReportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "todaywalletreport", component: WalletTodayReportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "leftteam", component: LeftTeamComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "rightteam", component: RightTeamComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "matchingroi", component: MatchingRoiReportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "matchingreport", component: WalletMatchingReportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "roireport", component: RoiReportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "sponsorincome", component: SponsorIncomeComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "transfer", component: TransferWalletComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "transferreport", component: TransferReportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "receivedreport", component: ReceivedReportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
     { path: "selftransfer", component: SelfTransferComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: "withdraw", component: WithdrawRequestComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
     { path: "treeview/:regid", component: TreeViewComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    { path: 'treeregister/:regid/:position', component: TreeRegistrationComponent, canActivate: [AuthGuard], data: { usertype: ['user'] } },
    { path: "depositfund", component: DepositFundComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
    // { path: "spinroll", component: SpinRollComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
     { path: "cpdash", component: CpDashboardComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
       { path: "support", component: SupportComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  // {path:"activation/:regid",component:UserActivation, canActivate: [AuthGuard], data: { roles: ['user'] } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
