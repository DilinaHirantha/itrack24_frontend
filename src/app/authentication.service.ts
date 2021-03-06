import { TokenPayload } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';



export interface UserDetails {
  id: number;
  user_type: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_num: string;
  email: string;
  password: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  id: number;
  user_type: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_num: string;
  email: string;
  password: string;


}

@Injectable()
export class AuthenticationService {
  private token: string;
  constructor(private http: HttpClient, private router: Router) { }
  private saveToken(token: string): void {
    localStorage.setItem('userToken', token);
    this.token = token;
    console.log(token);
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('userToken');
    }
    return this.token;
  }
  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload)
      return JSON.parse(payload);
    }
    else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/users/register`, user);

    // const request = base.pipe(
    //   map((data: TokenResponse) => {
    //     if (data.token) {
    //       this.saveToken(data.token);
    //       return data;
    //     } else {
    //       return null;
    //     }

    //   })
    // );

    return base;
  }
  
  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/users/login`, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        {
          return data;

        }
      })
    );

    return request;

  }

  // profile
  public profile(data):Observable<any>{
    return this.http.post(`/users/userprofile`, data)
  }
  // logout
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('userToken');
    this.router.navigateByUrl('/');
    console.log('logout');
  }

  // forgot_password
  public ResetPassword(user: TokenPayload): Observable<any> {
    return this.http.post(`/users/forgot`, user);
  }


  // edit-profile
  public EditProfile(user: TokenPayload): Observable<any> {
    const base = this.http.post(`/users/editprofile`, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          return data;
        } else {
          return null;
        }

      })
    );

    return request;
  }

  /*upload_profile_pic*/
  public sendUserID(userData): Observable<any> {
    return this.http.post(`/users/getUserID`, userData);
  }

  public uploadPhoto(fd): Observable<any> {
    return this.http.post(`/users/profilepic`, fd);
  }

  public viewPhoto(userData): Observable<any> { //IN_PROFILE
    return this.http.post(`/users/viewproimage`, userData);
  }

  /*reset_password_using_token*/

  public resetPasswordWithToken(token, pass): Observable<any> {
    return this.http.post(`/users/reset?token=` + token, { password: pass });//password eka body parameter ekak, token eka query parameter ekak//
  }

  /*activate_user_account*/

  public verification(token, email): Observable<any> {
    return this.http.get(`/users/verify?token=` + token + "&email=" + email);
  }
 
  /*getuserpassword*/
  public getPassword(data): Observable<any> {
    return this.http.post('/users/getpassword',data);
  }

  /*change_password*/
  public changePassword(obj): Observable<any> {
    return this.http.post('/users/changepassword',obj);
  }

}