import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private httpClient: HttpClient,
    private processMessage: ProcessHTTPMsgService  
  ) { }

  getPromotions(): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(baseURL + 'promotions')
            .pipe(catchError(this.processMessage.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.httpClient.get<Promotion>(baseURL + 'promotions' + id)
            .pipe(catchError(this.processMessage.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.httpClient.get<Promotion[]>(baseURL + 'promotions?featured=true')
            .pipe(map(promotions => promotions[0]))
            .pipe(catchError(this.processMessage.handleError));
  }

}
