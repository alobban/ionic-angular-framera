import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  url = 'https://randomuser.me/api/';

  constructor(private httpClient: HttpClient) { }

  getTeamMember(): Observable<any> {
    return this.httpClient.get(this.url + '?results=3');
  }
}
