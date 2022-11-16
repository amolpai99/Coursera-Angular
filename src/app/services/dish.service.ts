import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private httpClient: HttpClient,
    private processMessage: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(baseURL + 'dishes')
            .pipe(catchError(this.processMessage.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.httpClient.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processMessage.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.httpClient.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processMessage.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processMessage.handleError));
  }

}
