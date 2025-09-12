import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const AUTH_API ='https://ciyash.com/NWRI325/NWRI325/User/'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public token: TokenStorageService) { }

    UserRegistration(value: any){
    return this.http.post(
      AUTH_API + 'Register', value, {
        responseType: 'json',
      });
  }

  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,cca2'; 
getCountries() {
  return this.http.get(this.apiUrl);
}

  private baseApiUrl = 'https://api.apiverve.com/v1/callingcode';
  private apiKey = 'f83453ba-3d3d-4ec3-a87d-664f1b51bf82';
  
  getCallingCode(countryCode: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  
    const apiUrl = `${this.baseApiUrl}?country=${countryCode}`;
  
    return this.http.get(apiUrl, { headers });
  }

  GetusersDataByRegID(id:any){
    return this.http.get(
      AUTH_API + 'Get_Userdatabyregid/'+id,
    );
  }

   UDashboardData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Home',
      httpOptions
    );
  }

   UProfile(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Profile',
      httpOptions
    );
  }

  UpdateUserProfile(value: {
    password: string;
    wallet1: string;
  }) {
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Profileiupdate',
      { 
        "password":value.password, 
        "wallet1":value.wallet1, 
      },
      httpOptions
    );
  }

//withdraw wallet api
UserWithdraw(value: {
    amount: number;
    note: string;
    transactionpassword:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Withdrawrequest',
      { 
      "amount":value.amount, 
      "note":value.note,
      "transactionpassword":value.transactionpassword, 
    },
       httpOptions 
    );
  }

  UserWithdrawPending(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Withdrawrequestdata_pending',
      httpOptions
    );   
  }

  UserWithdrawCompleted(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Withdrawrequestdata_complete',
      httpOptions
    );   
  }

  //transfer wallet api
    UserSelfTransferWallet(value: {
    amount: number;
    remark: string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Wallet_SelfTransefer',
      { 
      "amount":value.amount, 
      "remark":value.remark, 
    },
       httpOptions 
    );
  }

  UserTransferUserWallet(value: {
    regid:string;
    amount: number;
    remark: string;
    transactionpassword:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Wallet_Transefer',
      { 
      "regid":value.regid, 
      "amount":value.amount, 
      "remark":value.remark,
      "transactionpassword":value.transactionpassword
    },
       httpOptions 
    );
  }

  TransferWalletData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Wallet_Transeferreport',
      httpOptions
    );   
  }

    ReceivedWalletData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Wallet_Receivereport',
      httpOptions
    );   
  }

 WalletReportData() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Wallet_Report`,
    httpOptions
  );
}

  WalletReport(page: number, perPage: number) {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  const pageDetails = `page=${page}&per_page=${perPage}`;
  return this.http.get(
    AUTH_API + `Wallet_Report?${pageDetails}`,
    httpOptions
  );
}


    UserNameDisplay(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(
      AUTH_API + 'Get_Userdatabyregid/'+id,
      httpOptions
    );  
  }

  //Packages Api

    GetPackages(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Get_Packages',
      httpOptions
    );   
  }

    GetPackagesById(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.get(
      AUTH_API + 'Get_Packagedata/'+id,
      httpOptions
    );  
  }

     ActivationData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Activation_data',
      httpOptions
    );   
  }

  //Support Ticket Api
AddSupport(value: {
  query: string;
  subject: string;
}){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.post(
    AUTH_API + 'Add_Supporttoken',
    { "query":value.query,
    "subject":value.subject,   
   },
     httpOptions 
  );
}

GetSupportTickets(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'User_Supporttokens',
    httpOptions
  );
}

//deposites api

  UserDeposite(formData: FormData): Observable<any> {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + token1
    })
  };

  return this.http.post(
    AUTH_API + 'Deposite',formData,
    httpOptions
  );
}

  DepositeUserData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'User_Deposites',
      httpOptions
    );   
  }

  //income report 
  SilverIncome(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'User_silvericonreport',
    httpOptions
  );
}


//activate api
ActivatePackage(value: {
    regid:string;
    package:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Activate',
      { 
      "regid":value.regid, 
      "package":value.package, 
    },
       httpOptions 
    );
  }




}
