import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient, private router:Router) { }

  
  getComplains():Observable<any>{
    return this.http.get(`/admin/viewcompNotification`);
  }

  getPosts():Observable<any>{
    return this.http.get(`/admin/viewpostNotification`);
  }

}
