import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

const AUTH_API ='https://yohaninv.live/NWRI325/NWRI325/User/'

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

   GetDynamicData(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Get_ROidynamicpayment',
      httpOptions
    );
  }

  UpdateDynamicData(value: {
  roi: number;
  sponcer:number;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Roivalue_Update', 

   {
    roi:value.roi,
        sponcer: value.sponcer,
      },
    httpOptions
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

  updateProfile(value: {
  name: string;
  password:string;
  email:string;
  wallet1:string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Profileiupdate', 

   {
    wallet1:value.wallet1,
        name: value.name,
        email:value.email,
        password:value.password,


      },
    httpOptions
  );
}

UserTreeView(id:any): Observable<any>{
const token1 = this.token.getToken();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token1
  })
}
return this.http.get(
  AUTH_API +`Tree_view/${id}` ,
  httpOptions
);
}

UserTreeViewDataById(id:any): Observable<any>{
const token1 = this.token.getToken();
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token1
  })
}
return this.http.get(
  AUTH_API + 'Treedata/'+id,
  httpOptions
);
}

//withdraw wallet api
UserWithdraw(value: {
    amount: number;
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

   SelfTransferReport(){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'User_SelfTransreport',
      httpOptions
    );   
  }

  UserTransferUserWallet(value: {
    regid:string;
    amount: number;
    remark: string;
    wallettyoe:string;
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
      "wallettyoe":value.wallettyoe
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

 WalletTodayReportData() {
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  };
  return this.http.get(
    AUTH_API + `Wallet_TodayReport`,
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

 forgotPassword(value: { regid: string; email: string }): Observable<any> {
  return this.http.post(AUTH_API + 'Forget_password', {
    regid: value.regid,
    email: value.email
  });
}

//deposites api

 DepositWallet(value: { amount: string, note: string, transno: string }) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Deposite',
    {
      amount: value.amount,
      note: value.note,
      transno: value.transno,
    },
    httpOptions
  );
}


   DepositeData() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
      return this.http.get(AUTH_API + 'User_Deposites', httpOptions);
  }

  //income report 
  Leftteam(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Left_members',
    httpOptions
  );
}

  Rightteam(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Right_members',
    httpOptions
  );
}

 RoiReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Roi',
    httpOptions
  );
}

  MatchingRoiReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Matchingdaily',
    httpOptions
  );
}

  MatchingWalletReport(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Wallet_Matching',
    httpOptions
  );
}

  DirectTeam(){
  const token1 = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token1
    })
  }
  return this.http.get(
    AUTH_API + 'Directteam',
    httpOptions
  );
}


//activate api
Activate(value: {
    regid:string;
    packagetype:string;
    amount:number;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Activateid',
      { 
      "regid":value.regid, 
      "packagetype":value.packagetype, 
       "amount":value.amount, 
    },
       httpOptions 
    );
  }

   UserActivate(value: {
    regid:string;
    packagetype:string;
    amount:number;
    atype:string;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Activateid',
      { 
      "regid":value.regid, 
      "packagetype":value.packagetype, 
      "amount":value.amount, 
      "atype":value.atype, 
    },
       httpOptions 
    );
  }

  Topup(value: {
    regid:string;
    packagetype:string;
    amount:number;
  }){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    };
    return this.http.post(
      AUTH_API + 'Topup',
      { 
      "regid":value.regid, 
      "packagetype":value.packagetype, 
      "amount":value.amount, 
    },
       httpOptions 
    );
  }

GenerateOtp() {
    const token = this.token.getToken(); 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }),
    };
      return this.http.get(AUTH_API + 'GenerateOtp', httpOptions);
  }

  VerifyOtp(value: {
  otp: string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Verify_Otp', 
   {
        otp: value.otp,
      },
    httpOptions
  );
}

 SpinRoll(value: { amount: number }) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'Spin_Roll',
    {
      amount: value.amount,
    },
    httpOptions
  );
}

//company apis
withdrawUsers() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(AUTH_API + 'Withdraw_users', httpOptions);
}

withdrawpaid() {
  const token = this.token.getToken(); 
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };
    return this.http.get(AUTH_API + 'Withdraw_Paid', httpOptions);
}

PayWithdraw(id:any){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Pay_withdrawreq/'+id,
      httpOptions
    );   
  }

  RejectWithdraw(id:any){
    const token1 = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token1
      })
    }
    return this.http.get(
      AUTH_API + 'Reject_withdrawreq/'+id,
      httpOptions
    );   
  }

  totalusers(page: number = 1) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.get(`${AUTH_API}Total_users?page=${page}`, httpOptions);
}

cupdateprofile(id: string, value: {
  regid: string;
  name: string;
  email: string;
  country: string;
  wallet1: string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.put(
    `${AUTH_API}Userprofile_Update/${id}`,  
    {
      regid: value.regid,
      name: value.name,
      email: value.email,
      country: value.country,
      wallet1: value.wallet1
    },
    httpOptions
  );
}


totalMembers() {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }),
  };

  return this.http.get(
    AUTH_API + "Total_Memebers",   // ✅ correct path
    httpOptions
  );
}

ActivatePremiumId(value: {
  regid: string;
  points:string;
}) {
  const token = this.token.getToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }),
  };

  return this.http.post(
    AUTH_API + 'ActivatePremimum', 
   {
        regid: value.regid,
        points:value.points,
      },
    httpOptions
  );
}



}
