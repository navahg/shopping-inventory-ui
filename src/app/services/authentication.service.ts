import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: string;

  constructor(private http: HttpClient,
              private config: AppConstants) {
    this.currentUser = localStorage.getItem('username');
  }

  public get currentUserValue(): string {
    return this.currentUser;
  }

  async login(username: string, password: string): Promise<Observable<object>> {
    const user: User = { username, password };
    // get the api
    const endpoint: any = await fetch(this.config.API_ROOT);
    // make the api call
    return this.http.post(`${endpoint.ip}/login/admin`, user,  { observe: 'response' });
  }

  logout() {
    // remove user from session storage to log user out
    localStorage.removeItem('username');
    this.currentUser = null;
  }
}



