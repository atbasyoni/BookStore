import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getOrders(): Observable<any>{
    return of([]);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any>{
    return of([]);
  }

  getRecentOrders(limit: number): Observable<any>{
    return of([]);
  }
}
