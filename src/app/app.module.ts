import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReferralRegistrationComponent } from './pages/referral-registration/referral-registration.component';
import { DashbaordComponent } from './pages/User/dashbaord/dashbaord.component';
import { MenuComponent } from './pages/User/menu/menu.component';
import { ProfileComponent } from './pages/User/profile/profile.component';
import { DirectTeamComponent } from './pages/User/direct-team/direct-team.component';
import { ActivationComponent } from './pages/User/activation/activation.component';
import { WalletReportComponent } from './pages/User/wallet-report/wallet-report.component';
import { WalletTodayReportComponent } from './pages/User/wallet-today-report/wallet-today-report.component';
import { LeftTeamComponent } from './pages/User/left-team/left-team.component';
import { RightTeamComponent } from './pages/User/right-team/right-team.component';
import { TreeViewComponent } from './pages/User/tree-view/tree-view.component';
import { MatchingRoiReportComponent } from './pages/User/matching-roi-report/matching-roi-report.component';
import { MatchingCashBackReportComponent } from './pages/User/matching-cash-back-report/matching-cash-back-report.component';
import { WalletMatchingReportComponent } from './pages/User/wallet-matching-report/wallet-matching-report.component';
import { RoiReportComponent } from './pages/User/roi-report/roi-report.component';
import { TransferWalletComponent } from './pages/User/transfer-wallet/transfer-wallet.component';
import { TransferReportComponent } from './pages/User/transfer-report/transfer-report.component';
import { ReceivedReportComponent } from './pages/User/received-report/received-report.component';
import { SelfTransferComponent } from './pages/User/self-transfer/self-transfer.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { WithdrawRequestComponent } from './pages/User/withdraw-request/withdraw-request.component';
import { TreeRegistrationComponent } from './pages/User/tree-registration/tree-registration.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { DepositFundComponent } from './pages/User/deposit-fund/deposit-fund.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { SpinRollComponent } from './pages/User/spin-roll/spin-roll.component';
import { CpDashboardComponent } from './pages/User/cp-dashboard/cp-dashboard.component';
import { OtherActivationComponent } from './pages/User/other-activation/other-activation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ReferralRegistrationComponent,
    DashbaordComponent,
    MenuComponent,
    ProfileComponent,
    DirectTeamComponent,
    ActivationComponent,
    WalletReportComponent,
    WalletTodayReportComponent,
    LeftTeamComponent,
    RightTeamComponent,
    TreeViewComponent,
    MatchingRoiReportComponent,
    MatchingCashBackReportComponent,
    WalletMatchingReportComponent,
    RoiReportComponent,
    TransferWalletComponent,
    TransferReportComponent,
    ReceivedReportComponent,
    SelfTransferComponent,
    ForgotPasswordComponent,
    WithdrawRequestComponent,
    TreeRegistrationComponent,
    DepositFundComponent,
    SpinRollComponent,
    CpDashboardComponent,
    OtherActivationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, OrganizationChartModule, ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule, TagModule,   DataViewModule,QRCodeComponent,
        DialogModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }), ClipboardModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
