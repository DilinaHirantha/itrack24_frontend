import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';


@Injectable()
export class NewsfeedService {

  constructor(private http:HttpClient, private route: Router ) {}

  public getPost(): Observable<any>{
    return this.http.get(`/users/viewposts`); 
  }

  public GetSelectPost(postdata):Observable<any>{
    return this.http.get(`/users/getselectpost`,postdata);
  }

  public AddLike(likedata): Observable<any> {
    return this.http.post(`/users/addlike`, likedata);
  }

  public RemoveLike(likedata): Observable<any> {
    return this.http.post(`/users/removelike`, likedata);
  }

  public GetLikes(likedata): Observable<any> {
    return this.http.post(`/users/getlikes`, likedata);
  }

   
}
