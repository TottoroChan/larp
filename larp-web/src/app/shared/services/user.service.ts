import { Character } from './../models/character.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user: User) {
    const result = this.http.post<User>('/api/users', user).pipe(
      catchError(this.handleError<User>('create')),
      map(
        (user) =>
          new User(
            user.id,
            user.login,
            user.name,
            user.surname,
            user.password,
            user.salt,
            user.roles,
            []
          )
      )
    );

    return result;
  }

  update(updatedUser: User) {
    const result = this.http
      .put<User>(`/api/users/${updatedUser.id}`, updatedUser)
      .pipe(catchError(this.handleError<User>('create')));

    return result;
  }

  delete(id: string) {
    const result = this.http
      .delete<User>(`/api/users/${id}`)
      .pipe(catchError(this.handleError<User>('create')));

    return result;
  }

  get(): Observable<User[]> {
    const result = this.http.get<User[]>('/api/users').pipe(
      catchError(this.handleError<User[]>('get')),
      map((users) => users.map((user) => this.convertUser(user)))
    );

    return result;
  }

  getOne(id: string) {
    const result = this.http.get<User>(`/api/users/${id}`).pipe(
      catchError(this.handleError<User>('get')),
      map((user) => this.convertUser(user))
    );

    return result;
  }

  private convertUser(user: any) {
    const characters = user.characters
      ? user.characters.map(
          (character: any) => new Character(character.id, character.name, [])
        )
      : [];

    const result = new User(
      user.id,
      user.login,
      user.name,
      user.surname,
      user.password,
      user.salt,
      user.roles,
      characters
    );

    return result;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      
      return of(result as T);
    };
  }
}
