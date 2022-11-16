import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private httpClient: HttpClient,
    private processMessage: ProcessHTTPMsgService  
  ) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<Feedback>(baseURL + 'feedback', feedback, httpOptions)
            .pipe(catchError(this.processMessage.handleError))
  }

}
