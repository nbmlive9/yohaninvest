import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API ='https://yohaninv.live/NWRI325/NWRI325/User/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(regid: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'Index',
      {
        regid: regid,
        password: password,
      },
      httpOptions
    );
  }

 

}
