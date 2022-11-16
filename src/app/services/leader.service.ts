import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private httpClient: HttpClient,
    private processMessage: ProcessHTTPMsgService
  ) { }

  getLeaders(): Observable<Leader[]> {
    return this.httpClient.get<Leader[]>(baseURL + 'leadership')
            .pipe(catchError(this.processMessage.handleError));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.httpClient.get<Leader[]>(baseURL + 'leadership?featured=true')
            .pipe(map(leaders => leaders[0]))
            .pipe(catchError(this.processMessage.handleError));
  }
}
