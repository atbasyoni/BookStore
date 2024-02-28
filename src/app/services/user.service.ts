import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  updateUser(user: User) : Observable<any>{
    return of([]);
  }

  getUsers() : Observable<any>{
    return of([]);
  }

  deleteUser(userId: number) : Observable<any>{
    return of([]);
  }

}
